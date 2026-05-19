const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const db = require("../db/pool");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name || null,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "validation_error", message: "email, password는 필수입니다." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "validation_error", message: "비밀번호는 6자 이상이어야 합니다." });
    }

    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: "email_exists", message: "이미 가입된 이메일입니다." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name`,
      [email, passwordHash, name || null]
    );

    const user = result.rows[0];
    const token = signToken(user);
    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "validation_error", message: "email, password는 필수입니다." });
    }

    const result = await db.query(
      "SELECT id, email, name, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "credentials_invalid", message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    const user = result.rows[0];
    if (!user.password_hash) {
      return res.status(400).json({ error: "oauth_only", message: "Google 로그인 전용 계정입니다." });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "credentials_invalid", message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    const token = signToken(user);
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return next(err);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "validation_error", message: "idToken이 필요합니다." });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: "config_error", message: "GOOGLE_CLIENT_ID가 설정되지 않았습니다." });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name || null;
    const googleId = payload.sub;

    let userRow = await db.query(
      "SELECT id, email, name FROM users WHERE google_id = $1 OR email = $2 LIMIT 1",
      [googleId, email]
    );

    let user;
    if (userRow.rowCount === 0) {
      const inserted = await db.query(
        `INSERT INTO users (email, name, google_id)
         VALUES ($1, $2, $3)
         RETURNING id, email, name`,
        [email, name, googleId]
      );
      user = inserted.rows[0];
    } else {
      const update = await db.query(
        `UPDATE users
         SET google_id = $1, name = COALESCE($2, name)
         WHERE id = $3
         RETURNING id, email, name`,
        [googleId, name, userRow.rows[0].id]
      );
      user = update.rows[0];
    }

    const token = signToken(user);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = {
  register,
  login,
  googleLogin,
  me,
};
