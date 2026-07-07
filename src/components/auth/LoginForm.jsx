import { useState } from "react";
import styles from "./auth.module.css";

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "로그인에 실패했어요.");
        return;
      }
      onSuccess(data.user, data.token);
    } catch {
      setError("네트워크 오류가 발생했어요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>아이디</span>
        <input
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>비밀번호</span>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
      </label>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
