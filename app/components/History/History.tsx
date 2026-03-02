'use client';

import React from 'react';
import { HistoryEntry } from '@/app/hooks/use-history';
import { useLanguage } from '@/app/i18n/LanguageContext';

export interface HistoryProps {
  entries: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ entries, onRestore, onClear }) => {
  const { i18n } = useLanguage();

  if (entries.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header: reuses global label style + mirrors the language toggle button */}
      <div className="flex justify-between items-center mb-3">
        <span className="label">{i18n('history_title')}</span>
        <button className="btn-subtle btn-subtle--destructive" onClick={onClear}>
          {i18n('history_clear')}
        </button>
      </div>

      <ul className="flex flex-col gap-2 list-none p-0 m-0">
        {entries.map((entry) => (
          <li key={entry.timestamp}>
            <button className="history__entry" onClick={() => onRestore(entry)}>
              {/* Input values — label reuses global label style */}
              <span className="flex gap-4">
                {[
                  { label: i18n('bit'), value: entry.bit },
                  { label: i18n('bush'), value: entry.bush },
                  { label: i18n('target_size_short'), value: entry.targetSize }
                ].map(({ label, value }) => (
                  <span key={label} className="flex flex-col gap-0.5">
                    <span className="history__entry-label">{label}</span>
                    <span className="history__entry-value">{value} mm</span>
                  </span>
                ))}
              </span>

              {/* Results */}
              <span className="flex flex-col items-end gap-0.5">
                <span className="history__entry-result text-(--accent-green)">
                  {entry.holeSize} mm
                </span>
                <span className="history__entry-result text-(--accent)">
                  ± {entry.offset.toFixed(2)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
