const TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

function toBase64Url(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function hmacSign(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(new Uint8Array(signature));
}

export async function createToken(secret, payload) {
  const body = { ...payload, exp: Date.now() + TOKEN_LIFETIME_MS };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(body)));
  const signature = await hmacSign(secret, payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifyToken(secret, token) {
  if (!token) return null;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expectedSignature = await hmacSign(secret, payloadB64);
  if (expectedSignature !== signature) return null;

  const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
  if (!payload.exp || payload.exp < Date.now()) return null;

  return payload;
}
