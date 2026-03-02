export type Lang = 'de' | 'en';

export const Translations: Record<Lang, { [key: string]: string }> = {
  de: {
    bit: 'Fräser',
    bush: 'Kopierring',
    target_size: 'Gewünschte Fräsung',
    result_title: 'ERGEBNIS',
    template_size: 'SCHABLONENMASS (LOCHGRÖSSE)',
    target_size_hint: 'Außen-Ø z.B. 10, 12, 17, 20, 24, 27, 30 und 40 mm',
    offset: 'VERSATZ',
    error: 'FEHLER',
    error_msg: 'Fräser > Ring',
    toggle: 'DE'
  },
  en: {
    bit: 'Router Bit',
    bush: 'Guide Bushing',
    target_size: 'Target Cut Size',
    target_size_hint: 'Outer-Ø e.g. 10, 12, 17, 20, 24, 27, 30 und 40 mm',
    result_title: 'RESULT',
    template_size: 'TEMPLATE SIZE (HOLE SIZE)',
    offset: 'OFFSET',
    error: 'ERROR',
    error_msg: 'Bit > Bushing',
    toggle: 'EN'
  }
};
