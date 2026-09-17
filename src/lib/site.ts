const FALLBACK_SITE_URL = "https://dra-maristela-arimilato.vercel.app";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      // Invalid env values (including redacted secrets) should not break the build.
    }
  }

  return FALLBACK_SITE_URL;
}
