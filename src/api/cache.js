const ONE_HOUR_MS = 60 * 60 * 1000;

export function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const { value, expiresAt } = parsed;

    if (!expiresAt || Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return value;
  } catch {
    return null;
  }
}

export function setCache(key, value, ttlMs = ONE_HOUR_MS) {
  const payload = {
    value,
    expiresAt: Date.now() + ttlMs,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}
