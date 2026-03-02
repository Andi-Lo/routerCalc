'use client';

import { CadSVG } from '@/app/Result/CadSVG';
import { RouterProps } from '@/app/RouterInput/RouterInput';
import { useLanguage } from '@/app/i18n/LanguageContext';

export const Result: React.FC<RouterProps> = ({ bit = 0, bush = 0, targetSize = 0 }) => {
  const { i18n } = useLanguage();

  const _bit = isNaN(bit) ? 0 : bit;
  const _bush = isNaN(bush) ? 0 : bush;
  const offset = (_bush - _bit) / 2;
  const holeSize = targetSize + (_bush - _bit);
  const hasError = _bit > 0 && _bush > 0 && _bit >= _bush;

  return (
    <div className="card w-full">
      <div className="result-box">
        <div className="result-label">{i18n('template_size')}</div>
        <div className="result-value result-value--green">
          {targetSize > 0 ? holeSize + ' mm' : '-'}
        </div>
        {targetSize > 0 && bit > 0 && bush > 0 && (
          <div className="formula">
            {targetSize} + ({bush} - {bit}) = {holeSize}
          </div>
        )}
      </div>

      <div className="result-box result-box--divider">
        <div className="result-label">{i18n('offset')}</div>
        <div className={`result-value ${hasError ? 'text-error' : 'result-value--orange'}`}>
          {hasError ? i18n('error') : offset.toFixed(2)}
        </div>
        <div className="formula">
          {hasError ? i18n('error_msg') : `({ ${bush} } - { ${bit} }) / 2`}
        </div>
      </div>

      <CadSVG bit={bit} bush={bush} offset={offset}></CadSVG>
    </div>
  );
};
