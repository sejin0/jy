import Button from "../ui/Button";

export default function Header({ user, onHistory, onReset, onLogout, onOpenAuth }) {
  return (
    <header className="header">
      <div>
        <h1>주역점</h1>
        <p>질문을 통해 흐름을 읽는 시간</p>
      </div>

      <div className="header-actions">
        <Button variant="ghost" onClick={onHistory}>
          기록
        </Button>
        <Button variant="ghost" onClick={onReset}>
          새로 시작
        </Button>
        {user ? <Button onClick={onLogout}>로그아웃</Button> : null}
      </div>
    </header>
  );
}
