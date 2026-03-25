const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { planArchitecture } = require('./skills/plan');
const { generateCode } = require('./skills/codegen');

async function main() {
  const Anthropic = require('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const jiraKey = process.env.JIRA_KEY;
  const orgPat = process.env.ORG_PAT;
  const issueNumber = process.env.ISSUE_NUMBER;

  // ===== 1. 데이터 로드 =====
  // DOCS 아티팩트에서 사양서 읽기 (무엇을 만들지)
  const docsSpec = fs.existsSync('docs-plan/plan-meta.json')
    ? fs.readFileSync('docs-plan/plan-meta.json', 'utf8')
    : '{}';

  const dashboardSpec = fs.existsSync('dashboard-spec.md')
    ? fs.readFileSync('dashboard-spec.md', 'utf8')
    : '';

  // FE 룰 읽기 (어떻게 만들지)
  const rulesDir = path.join(__dirname, '../../.fe-pipeline/rules');
  let rules = '';
  if (fs.existsSync(rulesDir)) {
    const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
    for (const file of ruleFiles) {
      rules += fs.readFileSync(path.join(rulesDir, file), 'utf8') + '\n\n';
    }
  }

  // BE 아티팩트 읽기 (기능 요청 정보)
  const beContext = fs.existsSync('be-artifact/pipeline-context.json')
    ? fs.readFileSync('be-artifact/pipeline-context.json', 'utf8')
    : '{}';

  // 기존 코드 패턴 읽기
  const existingCode = fs.existsSync('existing-code.txt')
    ? fs.readFileSync('existing-code.txt', 'utf8').substring(0, 3000)
    : '';

  console.log('=== Data Loaded ===');
  console.log('Rules length:', rules.length);
  console.log('Spec length:', dashboardSpec.length);
  console.log('BE context:', beContext.substring(0, 200));

  // ===== 2. Skill 1: 아키텍처 계획 =====
  console.log('\n=== Skill 1: Architecture Planning ===');
  const plan = await planArchitecture(client, {
    rules,
    spec: dashboardSpec,
    docsSpec,
    beContext,
    existingCode,
    jiraKey
  });
  console.log('Files to generate:', plan.files.length);

  // ===== 3. Skill 2: 코드 생성 =====
  console.log('\n=== Skill 2: Code Generation ===');
  const generatedFiles = await generateCode(client, {
    rules,
    spec: dashboardSpec,
    existingCode,
    plan
  });

  // ===== 4. 파일 작성 =====
  console.log('\n=== Writing Files ===');
  for (const file of generatedFiles) {
    const dir = path.dirname(file.path);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file.path, file.content);
    console.log('Written:', file.path, '(' + file.content.length + ' chars)');
  }

  // ===== 5. Git + PR =====
  console.log('\n=== Git Operations ===');
  const branch = `feature/${jiraKey}-dashboard-${Date.now()}`;
  execSync('git config user.email "pipeline@github.com"');
  execSync('git config user.name "Pipeline Bot"');
  execSync(`git remote set-url origin https://x-access-token:${orgPat}@github.com/org-pipeline-sophie/org-pipeline-sophie-fe.git`);
  execSync(`git checkout -b ${branch}`);
  execSync('git add apps/');

  const gitStatus = execSync('git status --porcelain').toString().trim();
  if (!gitStatus) {
    throw new Error('No changes to commit.');
  }
  execSync(`git commit -m "[FE] ${jiraKey}: Claude generated code"`);
  execSync(`git push origin ${branch}`);

  // PR 생성은 워크플로우의 github-script에서 처리 (github 객체 필요)
  // 여기서는 결과를 stdout으로 출력
  const result = JSON.stringify({
    branch,
    summary: plan.summary || 'Auto-generated',
    files: generatedFiles.map(f => f.path)
  });
  console.log('PIPELINE_RESULT:' + result);
}

main().catch(err => {
  console.error('Pipeline failed:', err.message);
  process.exit(1);
});
