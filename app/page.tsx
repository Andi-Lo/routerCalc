'use client';

import { RouterInput } from '@/app/components/RouterInput/RouterInput';
import { useNumberInput } from '@/app/hooks/use-number-input';
import { Result } from '@/app/components/Result/Result';

export default function Home() {
  const bit = useNumberInput(0);
  const bush = useNumberInput(0);
  const targetSize = useNumberInput(0);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full gap-8 max-w-3xl flex-col py-8 sm:items-start">
        <RouterInput
          onBitChange={bit.handleChange}
          onBushChange={bush.handleChange}
          onTargetSizeChange={targetSize.handleChange}
        ></RouterInput>

        <Result bit={bit.value} bush={bush.value} targetSize={targetSize.value}></Result>
      </main>
    </div>
  );
}
