import { useEffect, useState } from "react";

function HexLine({ value, visible }) {
  return (
    <div className={`casting-line ${visible ? "is-visible" : ""}`}>
      {value === 1 ? (
        <div className="casting-line-solid" />
      ) : (
        <>
          <div className="casting-line-broken" />
          <div className="casting-line-broken" />
        </>
      )}
    </div>
  );
}

export default function CastingView() {
  const [lines, setLines] = useState(Array(6).fill(null));

  useEffect(() => {
    let lineIndex = 0;

    const timer = setInterval(() => {
      setLines((current) => {
        const next = [...current];

        if (lineIndex >= 6) {
          lineIndex = 0;
          return Array(6).fill(null);
        }

        next[lineIndex] = Math.random() > 0.5 ? 1 : 0;
        lineIndex += 1;
        return next;
      });
    }, 280);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="card centered casting-card">
      <h2>괘를 짓는 중입니다</h2>
      <p>질문의 흐름을 살피며 효를 하나씩 세우고 있습니다.</p>

      <div className="casting-hexagram" aria-hidden="true">
        {[...lines].reverse().map((line, index) => (
          <HexLine key={index} value={line} visible={line !== null} />
        ))}
      </div>

      <div className="casting-glow" />
      <p className="casting-note">잠시만 기다리면 점괘가 모습을 드러냅니다.</p>
    </section>
  );
}
