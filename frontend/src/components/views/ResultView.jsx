import Button from "../ui/Button";

export default function ResultView({ result, onRestart }) {
  if (!result) {
    return null;
  }

  return (
    <section className="card">
      <h2>{result.hexagram_name}</h2>
      <p className="meta">
        카테고리: {result.category} | 점수: {result.score}
      </p>
      <p>{result.interpretation}</p>
      <p className="question">질문: {result.question}</p>
      <Button onClick={onRestart}>다시 보기</Button>
    </section>
  );
}
