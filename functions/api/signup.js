import { getDb } from "../_utils/db.js";
import { hashPassword } from "../_utils/crypto.js";
import { createToken } from "../_utils/session.js";
import { json } from "../_utils/http.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "잘못된 요청이에요." }, 400);
  }

  const name = (body.name ?? "").trim();
  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  if (!name || !username || !password) {
    return json({ error: "이름, 아이디, 비밀번호를 모두 입력해주세요." }, 400);
  }
  if (username.length < 3) {
    return json({ error: "아이디는 3자 이상이어야 해요." }, 400);
  }
  if (password.length < 8) {
    return json({ error: "비밀번호는 8자 이상이어야 해요." }, 400);
  }

  const sql = getDb(env);

  const existing = await sql`SELECT id FROM users WHERE username = ${username}`;
  if (existing.length > 0) {
    return json({ error: "이미 사용 중인 아이디예요." }, 409);
  }

  const passwordHash = await hashPassword(password);
  const rows = await sql`
    INSERT INTO users (name, username, password_hash)
    VALUES (${name}, ${username}, ${passwordHash})
    RETURNING id, name, username
  `;
  const user = rows[0];
  const token = await createToken(env.SESSION_SECRET, { sub: user.id, username: user.username, name: user.name });

  return json({ user, token });
}
