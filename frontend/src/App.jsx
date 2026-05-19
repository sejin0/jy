import { useState } from "react";
import Header from "./components/layout/Header";
import IntroView from "./components/views/IntroView";
import CastingView from "./components/views/CastingView";
import ResultView from "./components/views/ResultView";
import HistoryView from "./components/views/HistoryView";
import AuthForm from "./components/views/AuthForm";
import Modal from "./components/ui/Modal";
import { useAuth } from "./hooks/useAuth";
import { useDivination } from "./hooks/useDivination";

export default function App() {
  const auth = useAuth();
  const div = useDivination(auth.user, auth.token);
  const [authOpen, setAuthOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  async function handleLogin(form) {
    try {
      setAuthError("");
      await auth.login(form);
      setAuthOpen(false);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleRegister(form) {
    try {
      setAuthError("");
      await auth.register(form);
      setAuthOpen(false);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleGoogle(idToken) {
    try {
      setAuthError("");
      await auth.loginWithGoogle(idToken);
      setAuthOpen(false);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  return (
    <div className="page">
      <Header
        user={auth.user}
        onHistory={div.loadHistory}
        onReset={div.reset}
        onLogout={auth.logout}
        onOpenAuth={() => setAuthOpen(true)}
      />

      <main className="container">
        {div.view === "intro" ? (
          <IntroView
            question={div.question}
            setQuestion={div.setQuestion}
            onStart={div.cast}
            loading={div.loading || auth.loading}
            error={div.error}
          />
        ) : null}

        {div.view === "casting" ? <CastingView /> : null}

        {div.view === "result" ? <ResultView result={div.result} onRestart={div.reset} /> : null}

        {div.view === "history" ? (
          <HistoryView
            items={div.history}
            loading={div.loading}
            onBack={() => div.setView(div.result ? "result" : "intro")}
          />
        ) : null}
      </main>

      <Modal
        open={authOpen}
        title="로그인 또는 회원가입"
        text={authError || "이메일/JWT 또는 Google OAuth로 로그인할 수 있습니다."}
        onClose={() => setAuthOpen(false)}
        actions={
          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onGoogle={handleGoogle}
            googleClientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          />
        }
      />
    </div>
  );
}
