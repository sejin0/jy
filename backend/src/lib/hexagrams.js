const HEXAGRAMS = Array.from({ length: 64 }).map((_, index) => {
  const n = index + 1;
  const key = index.toString(2).padStart(6, "0");
  return {
    key,
    name: `괘 ${n}`,
    interpretation:
      "지금은 급하게 결론을 내리기보다 흐름을 관찰하고 작은 선택을 정교하게 반복할 때입니다.",
    baseScores: {
      general: 55 + (n % 30),
      wealth: 45 + ((n * 3) % 40),
      love: 45 + ((n * 5) % 40),
      career: 45 + ((n * 7) % 40),
      health: 45 + ((n * 11) % 40),
    },
  };
});

function randomHexagram() {
  const idx = Math.floor(Math.random() * HEXAGRAMS.length);
  return HEXAGRAMS[idx];
}

module.exports = {
  HEXAGRAMS,
  randomHexagram,
};
