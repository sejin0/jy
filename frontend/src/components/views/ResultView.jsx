import Button from "../ui/Button";
import { getResultImage } from "../../lib/hexagramImages";

const CATEGORY_LABELS = {
  general: "종합 흐름",
  wealth: "재물운",
  love: "애정운",
  career: "직장운",
  health: "건강운",
};

export default function ResultView({ result, onRestart }) {
  if (!result) {
    return null;
  }

  const image = getResultImage(result.hexagram_key);
  const categoryLabel = CATEGORY_LABELS[result.category] || result.category;

  return (
    <section className="card">
      {image ? (
        <div className="result-hero">
          <img src={image.url} alt={image.desc} className="result-hero-image" />
          <div className="result-hero-overlay" />
          <div className="result-hero-copy">
            <span className="result-chip">{categoryLabel}</span>
            <h2>{result.hexagram_name}</h2>
            <p className="result-hero-meta">점수 {result.score} | {image.desc}</p>
          </div>
        </div>
      ) : (
        <>
          <h2>{result.hexagram_name}</h2>
          <p className="meta">
            카테고리: {categoryLabel} | 점수: {result.score}
          </p>
        </>
      )}

      <div className="result-body">
        {result.meaning ? (
          <div className="result-section">
            <h3>괘의 형상</h3>
            <p>{result.meaning}</p>
          </div>
        ) : null}

        <div className="result-section emphasis">
          <h3>질문에 대한 해석</h3>
          <p>{result.interpretation}</p>
        </div>

        {result.advice ? (
          <div className="result-section">
            <h3>핵심 조언</h3>
            <p>{result.advice}</p>
          </div>
        ) : null}
      </div>

      <p className="question">질문: {result.question}</p>
      <Button onClick={onRestart}>다시 보기</Button>
    </section>
  );
}
