export default function HistoryView({ items, loading, onBack }) {
  return (
    <section className="card">
      <div className="row">
        <h2>점괘 기록</h2>
        <button className="text-btn" onClick={onBack}>
          닫기
        </button>
      </div>

      {loading ? <p>불러오는 중...</p> : null}

      {!loading && items.length === 0 ? <p>아직 기록이 없습니다.</p> : null}

      <ul className="history-list">
        {items.map((item) => (
          <li key={item.id}>
            <div className="row">
              <strong>{item.hexagram_name}</strong>
              <span>{new Date(item.created_at).toLocaleString()}</span>
            </div>
            <p className="meta">
              {item.category} | 점수 {item.score}
            </p>
            <p>{item.question}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
