const db = require("../db/pool");
const { randomHexagram } = require("../lib/hexagrams");
const { detectCategory, weightedScore } = require("../lib/keywords");

async function cast(req, res, next) {
  try {
    const { question, category: requestedCategory, sessionToken } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: "validation_error", message: "question은 필수입니다." });
    }

    const questionText = question.trim();
    const category = requestedCategory && requestedCategory !== "auto"
      ? requestedCategory
      : detectCategory(questionText);

    const hex = randomHexagram();
    const baseScore = hex.baseScores[category] || hex.baseScores.general;
    const score = weightedScore(baseScore, category, questionText);

    let saved;
    if (req.user?.id) {
      const result = await db.query(
        `INSERT INTO divinations (user_id, question, category, hexagram_key, hexagram_name, score)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, user_id, question, category, hexagram_key, hexagram_name, score, created_at`,
        [req.user.id, questionText, category, hex.key, hex.name, score]
      );
      saved = result.rows[0];
    } else {
      if (!sessionToken || !sessionToken.trim()) {
        return res.status(400).json({ error: "validation_error", message: "비로그인 요청에는 sessionToken이 필요합니다." });
      }

      const result = await db.query(
        `INSERT INTO divinations_anon (session_token, question, category, hexagram_key, hexagram_name, score)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, session_token, question, category, hexagram_key, hexagram_name, score, created_at`,
        [sessionToken.trim(), questionText, category, hex.key, hex.name, score]
      );
      saved = result.rows[0];
    }

    return res.status(201).json({
      ...saved,
      interpretation: hex.interpretation,
    });
  } catch (err) {
    return next(err);
  }
}

async function history(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    if (req.user?.id) {
      const result = await db.query(
        `SELECT id, question, category, hexagram_key, hexagram_name, score, created_at
         FROM divinations
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2`,
        [req.user.id, limit]
      );
      return res.json({ items: result.rows });
    }

    const sessionToken = (req.query.sessionToken || "").trim();
    if (!sessionToken) {
      return res.status(400).json({ error: "validation_error", message: "비로그인 조회에는 sessionToken이 필요합니다." });
    }

    const result = await db.query(
      `SELECT id, question, category, hexagram_key, hexagram_name, score, created_at
       FROM divinations_anon
       WHERE session_token = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [sessionToken, limit]
    );

    return res.json({ items: result.rows });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  cast,
  history,
};
