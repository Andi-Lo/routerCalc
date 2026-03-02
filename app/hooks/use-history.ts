'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'routerCalc_history';
const MAX_ENTRIES = 10;

export interface HistoryEntry {
  bit: number; // mm
  bush: number; // mm
  targetSize: number; // mm
  holeSize: number; // mm
  offset: number; // mm
  timestamp: number;
}

// Module-level cache — same reference returned until storage actually changes
let cachedEntries: HistoryEntry[] = [];
let cachedRaw: string | null = null;

function loadFromStorage(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    // Only parse + allocate a new array when the raw string has changed
    if (raw === cachedRaw) return cachedEntries;
    cachedRaw = raw;
    cachedEntries = raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
    return cachedEntries;
  } catch {
    return cachedEntries;
  }
}

function saveToStorage(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage unavailable — fail silently
  }
}

// Minimal external store so useSyncExternalStore can subscribe to changes
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Stable empty array for the server snapshot — must be a constant reference
const EMPTY: HistoryEntry[] = [];

export function useHistory() {
  const entries = useSyncExternalStore(
    subscribe,
    loadFromStorage,
    () => EMPTY // server snapshot — always empty to avoid hydration mismatch
  );

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
    const prev = loadFromStorage();
    const filtered = prev.filter(
      (e) => !(e.bit === entry.bit && e.bush === entry.bush && e.targetSize === entry.targetSize)
    );
    const next = [{ ...entry, timestamp: Date.now() }, ...filtered].slice(0, MAX_ENTRIES);
    saveToStorage(next);
    notifyListeners();
  }, []);

  const clearHistory = useCallback(() => {
    saveToStorage([]);
    notifyListeners();
  }, []);

  return { entries, addEntry, clearHistory };
}
