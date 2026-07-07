import { useState } from "react";
import styles from "./ContactForm.module.css";

const FORM_ENDPOINT = "https://formspree.io/f/xjgqzpao";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>의견을 들려주세요</h2>
      <p className={styles.subtitle}>사이트에 대한 제안이나 궁금한 점을 남겨주시면 확인 후 답변드릴게요.</p>

      {status === "success" ? (
        <p className={styles.successMessage}>문의가 접수되었어요. 빠르게 확인할게요!</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>이메일</span>
            <input type="email" name="email" required placeholder="답장받을 이메일 주소" className={styles.input} />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>내용</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="문의하실 내용을 편하게 적어주세요"
              className={styles.textarea}
            />
          </label>

          <button type="submit" className={styles.submitButton} disabled={status === "submitting"}>
            {status === "submitting" ? "보내는 중..." : "보내기"}
          </button>

          {status === "error" && <p className={styles.errorMessage}>전송에 실패했어요. 잠시 후 다시 시도해주세요.</p>}
        </form>
      )}
    </div>
  );
}
