import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'zss_cart_v1';
const WISHLIST_STORAGE_KEY = 'zss_wishlist_v1';
const IMAGE_CACHE_NAME = 'zss-images-cache';

export function loadStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(items: CartItem[]): void {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

export function loadStoredWishlist(fallback: string[]): string[] {
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : fallback;
  } catch {
    return fallback;
  }
}

export function saveStoredWishlist(ids: string[]): void {
  try {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage quota or private browsing errors
  }
}

/**
 * Gently warms browser Cache Storage (`zss-images-cache`) with unique site & catalog images
 * during idle time so repeat visits and color-swatch switches load instantaneously from disk.
 */
export function warmImageCacheInBackground(imageUrls: string[]): () => void {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return () => {};
  }

  // Respect data-saver mode on constrained mobile connections
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) {
    return () => {};
  }

  let cancelled = false;
  const uniqueUrls = Array.from(new Set(imageUrls.filter(Boolean)));

  const runWarmup = async () => {
    try {
      const cache = await window.caches.open(IMAGE_CACHE_NAME);
      const batchSize = 4;

      for (let i = 0; i < uniqueUrls.length; i += batchSize) {
        if (cancelled) return;
        const batch = uniqueUrls.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (url) => {
            if (cancelled) return;
            try {
              const existing = await cache.match(url);
              if (existing) return;
              const response = await fetch(url, { cache: 'force-cache' });
              if (response.ok) {
                await cache.put(url, response.clone());
              }
            } catch {
              // Skip any transient network failures silently
            }
          })
        );

        // Yield briefly between small batches to keep UI scrolling butter-smooth
        await new Promise((resolve) => window.setTimeout(resolve, 120));
      }
    } catch {
      // Ignore Cache API restrictions (e.g., opaque origins or private mode)
    }
  };

  const idleWindow = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === 'function') {
    const idleId = idleWindow.requestIdleCallback(
      () => {
        if (!cancelled) void runWarmup();
      },
      { timeout: 2500 }
    );
    return () => {
      cancelled = true;
      idleWindow.cancelIdleCallback?.(idleId);
    };
  }

  const timerId = window.setTimeout(() => {
    if (!cancelled) void runWarmup();
  }, 1500);

  return () => {
    cancelled = true;
    window.clearTimeout(timerId);
  };
}
