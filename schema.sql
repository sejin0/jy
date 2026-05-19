-- 주역점 앱 PostgreSQL 스키마
-- 실행: psql -U postgres -d juyeok -f docs/schema.sql

-- 유저 테이블
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),              -- NULL이면 OAuth 전용 계정
  name          VARCHAR(100),
  google_id     VARCHAR(255) UNIQUE,       -- Google OAuth ID
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 점괘 기록 테이블
CREATE TABLE IF NOT EXISTS divinations (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question       TEXT NOT NULL,
  category       VARCHAR(20) NOT NULL DEFAULT 'general',  -- wealth|love|career|health|general
  hexagram_key   VARCHAR(6) NOT NULL,                     -- ex: '101010'
  hexagram_name  VARCHAR(50) NOT NULL,
  score          INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 익명 점괘 기록 (비로그인 사용자, 7일 후 자동 삭제 권장)
CREATE TABLE IF NOT EXISTS divinations_anon (
  id             SERIAL PRIMARY KEY,
  session_token  VARCHAR(255) NOT NULL,
  question       TEXT NOT NULL,
  category       VARCHAR(20) NOT NULL DEFAULT 'general',
  hexagram_key   VARCHAR(6) NOT NULL,
  hexagram_name  VARCHAR(50) NOT NULL,
  score          INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_divinations_user_id ON divinations(user_id);
CREATE INDEX IF NOT EXISTS idx_divinations_created_at ON divinations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_divinations_anon_token ON divinations_anon(session_token);
