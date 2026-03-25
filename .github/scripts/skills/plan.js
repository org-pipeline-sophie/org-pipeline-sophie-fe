/**
 * Skill: Architecture Planning
 * DOCS 사양서 + FE 룰을 기반으로 구현할 파일 목록과 각 파일의 역할을 계획합니다.
 */

async function planArchitecture(client, { rules, spec, docsSpec, beContext, existingCode, jiraKey }) {
  const systemPrompt = `너는 React TypeScript 아키텍트야.

## FE 개발 룰
${rules}

## 지시사항
사양서와 기존 코드를 분석해서 구현할 파일 목록과 각 파일의 역할을 JSON으로만 응답해.
마크다운 코드블록 없이 순수 JSON만 출력해.`;

  const userPrompt = `## 개발 사양서
${spec}

## DOCS 계획 정보
${docsSpec}

## BE 요청 정보
${beContext}

## 기존 코드 패턴
${existingCode}

## JIRA: ${jiraKey}

다음 JSON 형식으로 응답해:
{
  "files": [
    {
      "path": "apps/dashboard/components/Foo.tsx",
      "description": "역할 설명",
      "priority": 1
    }
  ],
  "summary": "전체 계획 요약"
}`;

  console.log('Calling Claude for architecture plan...');
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }]
  });

  const planText = response.content?.[0]?.text || '';
  if (!planText || planText.trim() === '' || planText.trim() === '{}') {
    throw new Error('Claude returned empty plan. Response: ' + JSON.stringify(response).substring(0, 500));
  }

  console.log('Plan response:', planText.substring(0, 500));

  let plan;
  try {
    plan = JSON.parse(planText);
  } catch (e) {
    const match = planText.match(/\{[\s\S]*\}/);
    plan = match ? JSON.parse(match[0]) : { files: [], summary: 'parse fallback' };
  }

  if (!plan.files || plan.files.length === 0) {
    throw new Error('Architecture plan has 0 files. Plan: ' + planText.substring(0, 300));
  }

  return plan;
}

module.exports = { planArchitecture };
