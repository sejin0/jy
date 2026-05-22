import { useMemo, useState } from "react";
import { api } from "../lib/api";
import { getSessionToken } from "../lib/session";

const MIN_CASTING_MS = 2000;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function useDivination(user, token) {
  const [view, setView] = useState("intro");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sessionToken = useMemo(() => getSessionToken(), []);

  async function cast() {
    setLoading(true);
    setError("");
    setView("casting");

    const startedAt = Date.now();

    try {
      const data = await api.cast({
        token,
        question,
        category: "auto",
        sessionToken,
      });

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_CASTING_MS) {
        await wait(MIN_CASTING_MS - elapsed);
      }

      setResult(data);
      setView("result");
    } catch (err) {
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_CASTING_MS) {
        await wait(MIN_CASTING_MS - elapsed);
      }

      setError(err.message);
      setView("intro");
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory() {
    setLoading(true);
    setError("");

    try {
      const data = await api.history({ token, sessionToken, limit: 30 });
      setHistory(data.items || []);
      setView("history");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setQuestion("");
    setResult(null);
    setError("");
    setView("intro");
  }

  return {
    view,
    setView,
    question,
    setQuestion,
    result,
    history,
    loading,
    error,
    cast,
    loadHistory,
    reset,
    user,
  };
}
