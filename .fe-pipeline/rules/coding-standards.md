# FE 코딩 표준 및 규칙

## 기술 스택
- **Framework**: React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS only (별도 CSS 파일 금지)
- **Build**: Vite
- **State**: React hooks (useState, useReducer, useContext)
- **Package Manager**: npm

## 컴포넌트 규칙
- 모든 컴포넌트는 함수형(Function Component)으로 작성
- 컴포넌트 파일명은 PascalCase (예: TodoItem.tsx)
- 컴포넌트당 하나의 파일
- props는 TypeScript interface로 정의
- default export 사용

## 타입스크립트 규칙
- any 타입 사용 금지
- 모든 함수 파라미터와 반환값에 타입 명시
- interface 는 I 접두사 없이 이름만 사용 (예: TodoItem, not ITodoItem)
- type alias보다 interface 우선 사용

## 네이밍 규칙
- 컴포넌트: PascalCase (TodoList, SummaryCard)
- 함수/변수: camelCase (handleClick, isLoading)
- 상수: UPPER_SNAKE_CASE (MAX_ITEMS)
- CSS 클래스: Tailwind 유틸리티 클래스만 사용
- 파일: 컴포넌트는 PascalCase, 유틸/훅은 camelCase

## 폴더 구조
```
apps/
└── {feature}/
    ├── index.tsx           # 진입점 (React.render)
    ├── {Feature}Page.tsx   # 메인 페이지 컴포넌트
    ├── components/         # 하위 컴포넌트
    │   └── {Component}.tsx
    ├── hooks/              # 커스텀 훅
    │   └── use{Hook}.ts
    └── types.ts            # 타입 정의
```

## 코드 품질
- 컴포넌트는 200줄 이하로 유지
- 하나의 컴포넌트는 하나의 책임만
- 반복되는 로직은 커스텀 훅으로 분리
- 하드코딩된 문자열은 상수로 분리
- console.log는 개발용으로만, 커밋 전 제거

## Tailwind 사용 규칙
- 인라인 스타일 사용 금지
- className에 Tailwind 유틸리티 클래스만 사용
- 복잡한 클래스 조합은 변수로 추출
- 반응형: mobile-first (sm:, md:, lg: 순서로)
