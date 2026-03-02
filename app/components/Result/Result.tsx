'use client';

import { useLanguage } from '@/app/i18n/LanguageContext';
import { RouterProps } from '@/app/components/RouterInput/RouterInput';
import { CadSVG } from '@/app/components/Result/CadSVG';
import { useCountUp } from '@/app/hooks/use-count-up';

export const Result: React.FC<RouterProps> = ({ bit = 0, bush = 0, targetSize = 0 }) => {
  const { i18n } = useLanguage();

  const _bit = isNaN(bit) ? 0 : bit;
  const _bush = isNaN(bush) ? 0 : bush;
  const bothPresent = _bit > 0 && _bush > 0;
  const allPresent = bothPresent && targetSize > 0;
  const offset = bothPresent ? (_bush - _bit) / 2 : 0;
  const holeSize = allPresent ? targetSize + (_bush - _bit) : 0;

  const hasError = bothPresent && _bit >= _bush;
  const animatedHoleSize = useCountUp(allPresent && !hasError ? holeSize : 0);
  const animatedOffset = useCountUp(bothPresent && !hasError ? offset : 0);

  return (
    <div className="card w-full">
      <div className="result-box">
        <label>{i18n('template_size')}</label>
        <div className="result-value result-value--green">{animatedHoleSize.toFixed(2)} mm</div>
        <div className="formula">
          {targetSize > 0 ? `${targetSize} + (${bush} - ${bit}) = ${holeSize}` : '-'}
        </div>
      </div>

      <div className="result-box result-box--divider">
        <label>{i18n('offset')}</label>
        <div className={`result-value ${hasError ? 'text-error' : 'result-value--orange'}`}>
          {hasError ? i18n('error') : animatedOffset.toFixed(2)}
        </div>
        <div className="formula">{hasError ? i18n('error_msg') : `(${bush} - ${bit}) / 2`}</div>
      </div>

      <CadSVG bit={bit} bush={bush} offset={offset}></CadSVG>
    </div>
  );
};
