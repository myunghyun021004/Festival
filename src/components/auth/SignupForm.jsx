import { useState } from "react";
import styles from "./auth.module.css";

export default function SignupForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "회원가입에 실패했어요.");
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
        <span className={styles.label}>이름</span>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>아이디</span>
        <input
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디 (3자 이상)"
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
          placeholder="비밀번호 (8자 이상)"
          required
        />
      </label>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? "가입하는 중..." : "회원가입"}
      </button>
    </form>
  );
}
