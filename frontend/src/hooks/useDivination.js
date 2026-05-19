import { useMemo, useState } from "react";
import { api } from "../lib/api";
import { getSessionToken } from "../lib/session";

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

    try {
      const data = await api.cast({
        token,
        question,
        category: "auto",
        sessionToken,
      });
      setResult(data);
      setView("result");
    } catch (err) {
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
