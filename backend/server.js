require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const divinationRoutes = require("./src/routes/divinations");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/divinations", divinationRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "not_found", message: "요청한 API를 찾을 수 없습니다." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal_error", message: "서버 오류가 발생했습니다." });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
}

module.exports = app; // ← 이 줄 추가