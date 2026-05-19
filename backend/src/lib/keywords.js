const CATEGORY_KEYWORDS = {
  wealth: ["돈", "재물", "수입", "월급", "투자", "사업", "매출", "자산"],
  love: ["연애", "사랑", "이별", "결혼", "썸", "고백", "관계", "재회"],
  career: ["직장", "커리어", "이직", "면접", "승진", "회사", "업무", "취업"],
  health: ["건강", "병", "운동", "수면", "식습관", "다이어트", "통증", "회복"],
};

function detectCategory(question = "") {
  const text = question.toLowerCase();
  const scores = {
    wealth: 0,
    love: 0,
    career: 0,
    health: 0,
  };

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, words]) => {
    words.forEach((word) => {
      if (text.includes(word)) {
        scores[category] += 1;
      }
    });
  });

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return ranked[0][1] > 0 ? ranked[0][0] : "general";
}

function weightedScore(baseScore, category, question = "") {
  if (category === "general") {
    return baseScore;
  }

  const words = CATEGORY_KEYWORDS[category] || [];
  const text = question.toLowerCase();
  const hitCount = words.reduce((acc, word) => (text.includes(word) ? acc + 1 : acc), 0);

  const bonus = Math.min(hitCount * 4, 16);
  const result = Math.max(0, Math.min(100, baseScore + bonus));
  return result;
}

module.exports = {
  CATEGORY_KEYWORDS,
  detectCategory,
  weightedScore,
};
