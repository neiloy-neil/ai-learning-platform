'use client';

import { useEffect } from 'react';

const cachePrefixes = ['vite', 'workbox', 'pwa', 'react-refresh'];

export default function LegacyServiceWorkerCleanup() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const unregisterLegacyWorkers = async () => {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      } catch {
        // Ignore cleanup failures in the demo shell.
      }

      if (!('caches' in window)) {
        return;
      }

      try {
        const cacheKeys = await caches.keys();
        await Promise.all(
          cacheKeys
            .filter((key) => cachePrefixes.some((prefix) => key.toLowerCase().includes(prefix)))
            .map((key) => caches.delete(key)),
        );
      } catch {
        // Ignore cache cleanup failures in the demo shell.
      }
    };

    void unregisterLegacyWorkers();
  }, []);

  return null;
}
