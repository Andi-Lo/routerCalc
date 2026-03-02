'use client';

import React from 'react';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { useCountUp } from '@/app/hooks/use-count-up';

export interface StickyResultProps {
  holeSize: number; // mm
  offset: number; // mm
  visible: boolean;
  hasError: boolean;
}

export const StickyResult: React.FC<StickyResultProps> = ({
  holeSize,
  offset,
  visible,
  hasError
}) => {
  const { i18n } = useLanguage();
  const animatedHoleSize = useCountUp(holeSize);
  const animatedOffset = useCountUp(hasError ? 0 : offset);

  return (
    <div className={`sticky-result ${visible ? 'sticky-result--visible' : ''}`}>
      <span className="sticky-result__item">
        <span className="sticky-result__label">{i18n('template_size_short')}</span>
        <span className="sticky-result__value sticky-result__value--green">
          {animatedHoleSize.toFixed(2)} mm
        </span>
      </span>
      <span className="sticky-result__divider" />
      <span className="sticky-result__item">
        <span className="sticky-result__label">{i18n('offset')}</span>
        <span
          className={`sticky-result__value ${hasError ? 'text-error' : 'sticky-result__value--amber'}`}
        >
          {hasError ? i18n('error') : animatedOffset.toFixed(2)}
        </span>
      </span>
    </div>
  );
};
