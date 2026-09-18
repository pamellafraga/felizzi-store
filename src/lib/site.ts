const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      // Invalid env values should not break the build.
    }
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return FALLBACK_SITE_URL;
}
