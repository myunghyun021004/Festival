import { getDb } from "../_utils/db.js";
import { verifyPassword } from "../_utils/crypto.js";
import { createToken } from "../_utils/session.js";
import { json } from "../_utils/http.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "잘못된 요청이에요." }, 400);
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  if (!username || !password) {
    return json({ error: "아이디와 비밀번호를 입력해주세요." }, 400);
  }

  const sql = getDb(env);
  const rows = await sql`SELECT id, name, username, password_hash FROM users WHERE username = ${username}`;
  const user = rows[0];

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return json({ error: "아이디 또는 비밀번호가 올바르지 않아요." }, 401);
  }

  const token = await createToken(env.SESSION_SECRET, { sub: user.id, username: user.username, name: user.name });

  return json({ user: { id: user.id, name: user.name, username: user.username }, token });
}
