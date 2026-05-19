# 주역점 앱 (I Ching Divination App)

React + Node.js + PostgreSQL 기반 풀스택 앱입니다.

## 기술 스택

| 영역     | 기술                                     |
| -------- | ---------------------------------------- |
| Frontend | React 18, Vite                           |
| Backend  | Node.js, Express 5                       |
| Database | PostgreSQL 15                            |
| 인증     | JWT + Google OAuth(idToken 검증 방식)    |
| 기타     | dotenv, cors, pg, bcryptjs, jsonwebtoken |

## 디렉토리 구조

```
juyeok-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── styles/
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── lib/
│   │   ├── middleware/
│   │   └── routes/
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── schema.sql
```

## 빠른 시작

### 1. DB 준비

DB 생성/테이블 생성은 직접 진행하면 됩니다. 테이블 스키마는 `schema.sql`을 사용하세요.

### 2. Backend 실행

```bash
cd backend
cp .env.example .env  # Windows PowerShell: Copy-Item .env.example .env
npm install
npm run dev
```

필수 환경변수:

- `DATABASE_URL`
- `JWT_SECRET`
- `CLIENT_URL`
- `GOOGLE_CLIENT_ID` (Google 로그인 사용 시)

### 3. Frontend 실행

```bash
cd frontend
cp .env.example .env  # Windows PowerShell: Copy-Item .env.example .env
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

## 주요 API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google`
- `GET /api/auth/me`
- `POST /api/divinations/cast`
- `GET /api/divinations/history`
