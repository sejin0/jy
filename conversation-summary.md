# 대화 요약

## 1) 초기 요청

- 사용자는 README를 읽고 전체 프로그램 전략 수립을 요청함.
- 핵심 목표: React + Node.js + PostgreSQL 기반 주역점 앱 구현.

## 2) 전략 수립

- README와 기존 파일(App.jsx, server.js, schema.sql) 기준으로 현재 상태를 분석함.
- 구현 방향을 단계별로 정리함:
  1. 실행 기반 정리(frontend/backend 구조, 환경변수, 실행 스크립트)
  2. 점괘 핵심 플로우(질문 -> 점괘 생성 -> 저장/조회)
  3. 인증 확장(JWT + Google OAuth)
  4. 품질 보강(검증, 에러 처리, 테스트)

## 3) 사용자 의사결정 반영

- MVP 범위: 익명 + 이메일/JWT + Google OAuth 포함
- 점괘 로직: 64괘 정적 데이터 + 랜덤 생성
- 점수 로직: 질문 키워드 가중치 반영

## 4) 실제 구현 내용

### 백엔드

- Express 서버 구성 및 라우트 분리
- 인증 API 구현:
  - POST /api/auth/register
  - POST /api/auth/login
  - POST /api/auth/google
  - GET /api/auth/me
- 점괘 API 구현:
  - POST /api/divinations/cast
  - GET /api/divinations/history
- JWT 미들웨어 구현(authRequired, optionalAuth)
- PostgreSQL pool 연결 모듈 구현
- 점괘 엔진(64개 기본 데이터 생성, 랜덤 선택) 구현
- 키워드 기반 카테고리 탐지 및 점수 가중치 로직 구현

### 프런트엔드

- Vite + React 프로젝트 구조 구성
- 인증 훅(useAuth), 점괘 훅(useDivination) 구현
- API 클라이언트 및 익명 세션 토큰 로직 구현
- 주요 화면/컴포넌트 구현:
  - IntroView, CastingView, ResultView, HistoryView
  - Header, Modal, Button, AuthForm
- 기본 스타일(global.css) 적용

### 문서/구조 정리

- README를 현재 구조 및 실행법 기준으로 갱신
- 루트의 legacy 파일(App.jsx, server.js) 정리

## 5) 검증 결과

- backend 의존성 설치 성공
- frontend 의존성 설치 성공
- backend 서버 기동 로그 확인(API server listening on http://localhost:4000)
- frontend 빌드 성공(vite build)
- 워크스페이스 진단 오류 없음

## 6) 현재 전제

- DB 생성/테이블 생성은 사용자 직접 진행
- 스키마 파일: schema.sql

## 7) 마지막 상태

- 사용자는 "지금까지 대화한 내용 md 파일" 생성을 요청함.
- 본 문서(conversation-summary.md)가 해당 요청 결과물임.
