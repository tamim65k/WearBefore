import { Auth0Client } from "@auth0/nextjs-auth0/server";

function normalizeValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function normalizeDomain(value: string | undefined) {
  const normalized = normalizeValue(value);

  if (!normalized) {
    return undefined;
  }

  return normalized
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

const domain = normalizeDomain(
  process.env.AUTH0_DOMAIN ?? process.env.AUTH0_ISSUER_BASE_URL,
);

const appBaseUrl =
  normalizeValue(process.env.APP_BASE_URL) ??
  normalizeValue(process.env.AUTH0_BASE_URL);

export const auth0 = new Auth0Client({
  domain,
  clientId: normalizeValue(process.env.AUTH0_CLIENT_ID),
  clientSecret: normalizeValue(process.env.AUTH0_CLIENT_SECRET),
  secret: normalizeValue(process.env.AUTH0_SECRET),
  appBaseUrl,
});