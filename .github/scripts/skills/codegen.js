/**
 * Skill: Code Generation
 * 아키텍처 계획의 각 파일에 대해 FE 룰을 준수하는 코드를 생성합니다.
 */

async function generateCode(client, { rules, spec, existingCode, plan }) {
  const generatedFiles = [];

  for (const fileSpec of (plan.files || []).slice(0, 8)) {
    console.log('Generating:', fileSpec.path);

    const systemPrompt = `너는 시니어 React TypeScript 개발자야.

## FE 개발 룰 (반드시 준수)
${rules}

## 지시사항
- 파일 코드만 출력해
- 마크다운 코드블록 없이 순수 코드만 출력
- Tailwind CSS를 사용해
- TypeScript strict 모드 준수
- any 타입 사용 금지`;

    const userPrompt = `## 생성할 파일
- 경로: ${fileSpec.path}
- 역할: ${fileSpec.description}

## 개발 사양서
${spec.substring(0, 2000)}

## 기존 코드 패턴 참고
${existingCode.substring(0, 1000)}

이 파일의 완성된 TypeScript/TSX 코드를 작성해줘.`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const code = response.content?.[0]?.text || '';
    // 마크다운 코드블록 제거
    const cleanCode = code
      .replace(/^\`\`\`[a-z]*\n?/gm, '')
      .replace(/^\`\`\`$/gm, '')
      .trim();

    generatedFiles.push({
      path: fileSpec.path,
      content: cleanCode
    });

    console.log('Generated:', fileSpec.path, '(' + cleanCode.length + ' chars)');
  }

  return generatedFiles;
}

module.exports = { generateCode };
