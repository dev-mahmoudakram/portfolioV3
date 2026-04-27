import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

interface CookieStoreLike {
  get: (name: string) => { value: string } | undefined;
}

export const ADMIN_SESSION_COOKIE = "admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "dev-admin-session-secret";
}

function parseCookies(cookieHeader: string | null) {
  const cookies = new Map<string, string>();
  if (!cookieHeader) {
    return cookies;
  }

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const [rawKey, ...rawValueParts] = pair.trim().split("=");
    if (!rawKey) continue;
    cookies.set(rawKey, decodeURIComponent(rawValueParts.join("=")));
  }

  return cookies;
}

export function createAdminSessionValue() {
  const password = getAdminPassword();
  const secret = getAdminSessionSecret();

  if (!password) {
    return "";
  }

  return createHmac("sha256", secret).update(password).digest("hex");
}

export function validateAdminPassword(password: string) {
  const expected = getAdminPassword();
  if (!expected || !password) {
    return false;
  }

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  if (passwordBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(passwordBuffer, expectedBuffer);
}

export function isAdminSessionValueValid(value: string | undefined | null) {
  if (!value) {
    return false;
  }

  const expected = createAdminSessionValue();
  if (!expected) {
    return false;
  }

  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}

export function isAdminAuthorizedFromCookieStore(cookieStore: CookieStoreLike) {
  return isAdminSessionValueValid(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function isAdminAuthorizedFromRequest(request: Request) {
  const cookies = parseCookies(request.headers.get("cookie"));
  return isAdminSessionValueValid(cookies.get(ADMIN_SESSION_COOKIE));
}
