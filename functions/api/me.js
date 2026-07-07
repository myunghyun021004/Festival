import { verifyToken } from "../_utils/session.js";
import { json } from "../_utils/http.js";

export async function onRequestGet({ request, env }) {
  const authHeader = request.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const payload = await verifyToken(env.SESSION_SECRET, token);

  if (!payload) {
    return json({ error: "unauthorized" }, 401);
  }

  return json({ user: { id: payload.sub, username: payload.username, name: payload.name } });
}
