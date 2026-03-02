'use client';

import { createContext, useContext, useState } from 'react';
import { Lang, Translations } from '@/app/i18n/lang';

/**
 * Defines the shape of the Language Context value.
 *
 * @interface LanguageContextType
 * @property {Lang} currentLang - The currently active language code (e.g. `'en'` or `'de'`).
 * @property {(lang: Lang) => void} setCurrentLang - Setter to switch the active language.
 * @property {(key: string) => string} i18n - Translation function. Looks up a translation key
 *   in the current language's dictionary. Falls back to the key itself if no translation is found.
 */
interface LanguageContextType {
  currentLang: Lang;
  setCurrentLang: (lang: Lang) => void;
  i18n: (key: string) => string;
}

/**
 * The Language Context object. Acts as the shared container for language state,
 * accessible to any component nested inside {@link LanguageProvider}.
 *
 * Defaults to `null` when consumed outside of a {@link LanguageProvider}.
 *
 * @example
 * // Consumed via the useLanguage hook — prefer that over reading this directly.
 * const ctx = useContext(LanguageContext);
 */
export const LanguageContext = createContext<LanguageContextType | null>(null);

/**
 * Context Provider component that owns the language state and broadcasts it
 * to all descendant components.
 *
 * Wrap this around your application root (or any subtree) to make language
 * switching available throughout that part of the component tree.
 *
 * @param {{ children: React.ReactNode }} props
 * @param {React.ReactNode} props.children - The component subtree that will have access to the language context.
 *
 * @example
 * // app/layout.tsx
 * <LanguageProvider>
 *   <Header />
 *   <Main />
 * </LanguageProvider>
 */
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Lang>('en');

  /**
   * Looks up a translation key for the current language.
   * Falls back to the key string itself if no translation is found.
   *
   * @param {string} key - The translation key to look up.
   * @returns {string} The translated string, or the key as a fallback.
   */
  const i18n = (key: string) => Translations[currentLang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook for consuming the Language Context.
 *
 * Returns the current language, the setter to change it, and the translation
 * function `i18n`. Must be called inside a component that is nested within
 * {@link LanguageProvider}.
 *
 * @returns {LanguageContextType} The language context value.
 * @throws {Error} If called outside of a {@link LanguageProvider}.
 *
 * @example
 * const MyComponent = () => {
 *   const { currentLang, setCurrentLang, i18n } = useLanguage();
 *
 *   return (
 *     <>
 *       <h1>{i18n('welcome_title')}</h1>
 *       <button onClick={() => setCurrentLang('de')}>Switch to DE</button>
 *     </>
 *   );
 * };
 */
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
