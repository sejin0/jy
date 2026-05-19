const jwt = require("jsonwebtoken");

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "unauthorized", message: "인증 토큰이 필요합니다." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email, name: payload.name || null };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "token_invalid", message: "유효하지 않은 토큰입니다." });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email, name: payload.name || null };
  } catch (err) {
    req.user = null;
  }

  return next();
}

module.exports = {
  authRequired,
  optionalAuth,
};
