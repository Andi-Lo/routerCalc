'use client';

import { useLanguage } from '@/app/i18n/LanguageContext';

export interface RouterProps {
  bit?: number;
  bush?: number;
  targetSize?: number;
  onBitChange?: (value: number) => void; // measured in mm
  onBushChange?: (value: number) => void; // measured in mm
  onTargetSizeChange?: (value: number) => void; // measured in mm
  onReset?: () => void;
}

export const RouterInput: React.FC<RouterProps> = ({
  bit = 0,
  bush = 0,
  targetSize = 0,
  onBitChange,
  onBushChange,
  onTargetSizeChange,
  onReset
}) => {
  const { i18n } = useLanguage();

  const parseUserInput = (value: string): number => {
    const parsed = parseFloat(value.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <div className="card w-full">
      {/* Card header row: bit label + reset button */}
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="bit">{i18n('bit')}</label>
        {onReset && (
          <button
            className="btn-subtle hover:text-(--text-main) hover:border-(--accent)"
            onClick={onReset}
          >
            {i18n('reset')}
          </button>
        )}
      </div>
      <div className="input-wrapper ring-spin mb-6">
        <input
          type="number"
          id="bit"
          value={bit === 0 ? '' : bit}
          onChange={(e) => onBitChange?.(parseUserInput(e.target.value))}
          inputMode="decimal"
        />
        <span className="unit">mm</span>
      </div>

      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor="bush">{i18n('bush')}</label>
      </div>
      <div className="input-wrapper ring-spin">
        <input
          type="number"
          id="bush"
          value={bush === 0 ? '' : bush}
          onChange={(e) => onBushChange?.(parseUserInput(e.target.value))}
          inputMode="decimal"
        />
        <span className="unit">mm</span>
      </div>
      <label className="pt-2 block mb-6 hint">{i18n('target_size_hint')}</label>

      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor="targetSize">{i18n('target_size')}</label>
      </div>
      <div className="input-wrapper ring-spin ring-spin--green">
        <input
          type="number"
          id="targetSize"
          value={targetSize === 0 ? '' : targetSize}
          onChange={(e) => onTargetSizeChange?.(parseUserInput(e.target.value))}
          inputMode="decimal"
        />
        <span className="unit">mm</span>
      </div>
    </div>
  );
};
