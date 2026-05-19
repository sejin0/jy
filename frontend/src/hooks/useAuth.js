import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const TOKEN_KEY = "juyeok_auth_token";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    let canceled = false;
    setLoading(true);

    api
      .me(token)
      .then((data) => {
        if (!canceled) {
          setUser(data.user);
        }
      })
      .catch(() => {
        if (!canceled) {
          localStorage.removeItem(TOKEN_KEY);
          setToken("");
          setUser(null);
        }
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, [token]);

  const actions = useMemo(
    () => ({
      async register(form) {
        const data = await api.register(form);
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      async login(form) {
        const data = await api.login(form);
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      async loginWithGoogle(idToken) {
        const data = await api.googleLogin({ idToken });
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);
      },
      logout() {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
        setUser(null);
      },
    }),
    []
  );

  return {
    token,
    user,
    loading,
    ...actions,
  };
}
