import { useState } from "react";
import Button from "../ui/Button";

export default function AuthForm({ onLogin, onRegister, onGoogle, googleClientId }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [googleToken, setGoogleToken] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (mode === "login") {
      await onLogin({ email, password });
    } else {
      await onRegister({ email, password, name });
    }
  }

  return (
    <div className="auth-form">
      <div className="tabs">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>로그인</button>
        <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>회원가입</button>
      </div>

      <form onSubmit={submit}>
        {mode === "register" ? (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        ) : null}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" type="password" required />
        <Button type="submit">{mode === "login" ? "로그인" : "회원가입"}</Button>
      </form>

      <hr />
      <p>Google OAuth (백엔드 idToken 검증 방식)</p>
      <input
        value={googleToken}
        onChange={(e) => setGoogleToken(e.target.value)}
        placeholder={googleClientId ? "Google ID Token 입력" : "VITE_GOOGLE_CLIENT_ID 설정 필요"}
      />
      <Button onClick={() => onGoogle(googleToken)} disabled={!googleToken || !googleClientId}>
        Google 로그인
      </Button>
    </div>
  );
}
