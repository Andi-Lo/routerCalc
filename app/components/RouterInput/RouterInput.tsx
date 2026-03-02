'use client';

import { useNumberInput } from '@/app/hooks/use-number-input';
import { useLanguage } from '@/app/i18n/LanguageContext';

export interface RouterProps {
  bit?: number;
  bush?: number;
  targetSize?: number;
  onBitChange?: (value: number) => void; // measured in mm
  onBushChange?: (value: number) => void; // measured in mm
  onTargetSizeChange?: (value: number) => void; // measured in mm
}

export const RouterInput: React.FC<RouterProps> = ({
  onBitChange,
  onBushChange,
  onTargetSizeChange
}) => {
  const { i18n } = useLanguage();

  const bit = useNumberInput(undefined, onBitChange);
  const bush = useNumberInput(undefined, onBushChange);
  const targetSize = useNumberInput(undefined, onTargetSizeChange);

  const parseUserInput = (value: string): number => {
    const parsed = parseFloat(value.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <div className="card w-full">
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor="bit">{i18n('bit')}</label>
      </div>
      <div className="input-wrapper mb-6">
        <input
          type="number"
          id="bit"
          value={bit.value === 0 ? '' : bit.value}
          onChange={(e) => bit.handleChange(parseUserInput(e.target.value))}
          inputMode="decimal"
        ></input>
        <span className="unit">mm</span>
      </div>

      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor="bush">{i18n('bush')}</label>
      </div>
      <div className="input-wrapper mb-6">
        <input
          type="number"
          id="bush"
          value={bush.value === 0 ? '' : bush.value}
          onChange={(e) => bush.handleChange(parseUserInput(e.target.value))}
          inputMode="decimal"
        ></input>
        <span className="unit">mm</span>
        <label className="pt-2 hint">{i18n('target_size_hint')}</label>
      </div>

      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor="targetSize">{i18n('target_size')}</label>
      </div>
      <div className="input-wrapper">
        <input
          type="number"
          id="targetSize"
          value={targetSize.value === 0 ? '' : targetSize.value}
          onChange={(e) => targetSize.handleChange(parseUserInput(e.target.value))}
          inputMode="decimal"
        ></input>
        <span className="unit">mm</span>
      </div>
    </div>
  );
};
