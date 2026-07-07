import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "./auth.module.css";

export default function AuthBar({ user, onAuthSuccess, onLogout }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("login");

  if (user) {
    return (
      <div className={styles.bar}>
        <span className={styles.welcome}>{user.name}님 환영해요</span>
        <button type="button" className={styles.linkButton} onClick={onLogout}>
          로그아웃
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <div className={styles.bar}>
        <span className={styles.welcome}>로그인하면 더 편하게 이용할 수 있어요</span>
        <button type="button" className={styles.linkButton} onClick={() => setOpen(true)}>
          로그인 / 회원가입
        </button>
      </div>
    );
  }

  function handleSuccess(nextUser, token) {
    setOpen(false);
    onAuthSuccess(nextUser, token);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.tabRow}>
        <button
          type="button"
          className={`${styles.tab} ${tab === "login" ? styles.tabActive : ""}`}
          onClick={() => setTab("login")}
        >
          로그인
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === "signup" ? styles.tabActive : ""}`}
          onClick={() => setTab("signup")}
        >
          회원가입
        </button>
        <button type="button" className={styles.closeButton} onClick={() => setOpen(false)}>
          닫기
        </button>
      </div>

      {tab === "login" ? <LoginForm onSuccess={handleSuccess} /> : <SignupForm onSuccess={handleSuccess} />}
    </div>
  );
}
