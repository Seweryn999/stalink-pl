const ALLOWED_HOSTS = new Set(["stalink.pl", "www.stalink.pl"]);

const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);

function isAllowedUrl(value: string): boolean {
  try {
    const { hostname, protocol } = new URL(value);

    if (
      process.env.NODE_ENV !== "production" &&
      DEV_HOSTS.has(hostname) &&
      (protocol === "http:" || protocol === "https:")
    ) {
      return true;
    }

    return protocol === "https:" && ALLOWED_HOSTS.has(hostname);
  } catch {
    return false;
  }
}

/**
 * Akceptuje tylko zadania wychodzace z naszej domeny. Przegladarki wysylaja
 * naglowek Origin przy kazdym POST, wiec jego brak oznacza zwykle skrypt lub bota.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) return isAllowedUrl(origin);

  const referer = request.headers.get("referer");
  if (referer) return isAllowedUrl(referer);

  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 10_000;

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
}

/**
 * Prosty licznik w pamieci procesu. Na Vercelu kazda instancja funkcji ma wlasny
 * licznik, a zimny start go zeruje - to zatrzymuje zwykle naduzycia, ale nie jest
 * twardym zabezpieczeniem. Przy wiekszym ruchu warto przeniesc to do Vercel KV
 * lub Upstash Redis.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) prune(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Czyta body z twardym limitem rozmiaru. Zwraca null przy przekroczeniu limitu
 * lub niepoprawnym JSON-ie, zamiast rzucac wyjatkiem.
 */
export async function readJsonBody<T>(
  request: Request,
  maxBytes: number
): Promise<T | null> {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > maxBytes) return null;

  let text: string;
  try {
    text = await request.text();
  } catch {
    return null;
  }

  if (text.length > maxBytes) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
