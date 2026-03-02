export type Lang = 'de' | 'en';

export const Translations: Record<Lang, { [key: string]: string }> = {
  de: {
    bit: 'Fräser',
    bush: 'Kopierring',
    target_size: 'Gewünschte Fräsung',
    target_size_short: 'Fräsung',
    result_title: 'Ergebnis',
    template_size: 'SCHABLONENMASS (LOCHGRÖSSE)',
    template_size_short: 'SCHABLONE',
    target_size_hint: 'Außen-Ø z.B. 10, 12, 17, 20, 24, 27, 30 und 40 mm',
    offset: 'VERSATZ',
    error: 'FEHLER',
    error_msg: 'Fräser > Ring',
    toggle: 'DE',
    history_title: 'Zuletzt verwendet',
    history_clear: 'Löschen',
    reset: 'Zurücksetzen'
  },
  en: {
    bit: 'Router Bit',
    bush: 'Guide Bushing',
    target_size: 'Target Cut Size',
    target_size_short: 'Target',
    target_size_hint: 'Outer-Ø e.g. 10, 12, 17, 20, 24, 27, 30 und 40 mm',
    result_title: 'Result',
    template_size: 'TEMPLATE SIZE (HOLE SIZE)',
    template_size_short: 'TEMPLATE',
    offset: 'OFFSET',
    error: 'ERROR',
    error_msg: 'Bit > Bushing',
    toggle: 'EN',
    history_title: 'Recent',
    history_clear: 'Clear',
    reset: 'Reset'
  }
};
