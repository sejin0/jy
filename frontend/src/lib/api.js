const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, { method = "GET", token, body } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || "요청 처리 중 오류가 발생했습니다.";
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (payload) => request("/api/auth/register", { method: "POST", body: payload }),
  login: (payload) => request("/api/auth/login", { method: "POST", body: payload }),
  googleLogin: (payload) => request("/api/auth/google", { method: "POST", body: payload }),
  me: (token) => request("/api/auth/me", { token }),

  cast: ({ token, ...payload }) => request("/api/divinations/cast", { method: "POST", token, body: payload }),
  history: ({ token, sessionToken, limit = 20 }) => {
    const query = new URLSearchParams();
    query.set("limit", String(limit));
    if (!token && sessionToken) {
      query.set("sessionToken", sessionToken);
    }
    return request(`/api/divinations/history?${query.toString()}`, { token });
  },
};
