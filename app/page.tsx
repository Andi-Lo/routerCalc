'use client';

import { RouterInput } from '@/app/components/RouterInput/RouterInput';
import { useNumberInput } from '@/app/hooks/use-number-input';
import { Result } from '@/app/components/Result/Result';
import { useHistory, HistoryEntry } from '@/app/hooks/use-history';
import { History } from '@/app/components/History/History';
import { StickyResult } from '@/app/components/StickyResult/StickyResult';
import { useEffect, useRef } from 'react';

export default function Home() {
  const bit = useNumberInput(0);
  const bush = useNumberInput(0);
  const targetSize = useNumberInput(0);
  const { entries, addEntry, clearHistory } = useHistory();
  const isRestoring = useRef(false);

  const _bit = isNaN(bit.value) ? 0 : bit.value;
  const _bush = isNaN(bush.value) ? 0 : bush.value;
  const bothPresent = _bit > 0 && _bush > 0;
  const hasError = bothPresent && _bit >= _bush;
  const allFilled = bothPresent && targetSize.value > 0;
  const offset = bothPresent ? (_bush - _bit) / 2 : 0;
  const holeSize = allFilled ? targetSize.value + (_bush - _bit) : 0;

  // Save to history 1000ms after the user stops changing values.
  // Skipped when the change came from a history restore.
  useEffect(() => {
    if (!allFilled || hasError) return;
    const timer = setTimeout(() => {
      if (isRestoring.current) {
        isRestoring.current = false;
        return;
      }
      const offset = (_bush - _bit) / 2;
      const holeSize = targetSize.value + (_bush - _bit);
      addEntry({ bit: _bit, bush: _bush, targetSize: targetSize.value, holeSize, offset });
    }, 1000);
    return () => clearTimeout(timer);
  }, [_bit, _bush, targetSize.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRestore = (entry: HistoryEntry) => {
    isRestoring.current = true;
    bit.restore(entry.bit);
    bush.restore(entry.bush);
    targetSize.restore(entry.targetSize);
  };

  const handleReset = () => {
    isRestoring.current = true;
    bit.restore(0);
    bush.restore(0);
    targetSize.restore(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <StickyResult holeSize={holeSize} offset={offset} hasError={hasError} />
      <main className="flex min-h-screen w-full gap-8 max-w-3xl flex-col py-8 px-4 sm:px-6 sm:items-start md:pt-8 pt-20">
        <RouterInput
          onBitChange={bit.handleChange}
          onBushChange={bush.handleChange}
          onTargetSizeChange={targetSize.handleChange}
          bit={bit.value}
          bush={bush.value}
          targetSize={targetSize.value}
          onReset={handleReset}
        />
        <Result bit={bit.value} bush={bush.value} targetSize={targetSize.value} />
        <History entries={entries} onRestore={handleRestore} onClear={clearHistory} />
      </main>
    </div>
  );
}
