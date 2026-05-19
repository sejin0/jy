import Button from "../ui/Button";

export default function IntroView({ question, setQuestion, onStart, loading, error }) {
  return (
    <section className="card">
      <h2>무엇이 궁금한가요?</h2>
      <p>지금 가장 중요한 질문을 한 문장으로 적어보세요.</p>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="예: 올해 이직이 나에게 유리할까요?"
        rows={5}
      />
      {error ? <div className="error">{error}</div> : null}
      <Button onClick={onStart} disabled={loading}>
        {loading ? "점을 보는 중..." : "점괘 시작"}
      </Button>
    </section>
  );
}
