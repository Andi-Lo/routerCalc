'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { useEffect } from 'react';

export const Header = () => {
  const { currentLang, setCurrentLang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return (
    <header>
      <h1>
        <Image
          src="/routerCalcLogo.png"
          alt="Router Calculator logo"
          className="mr-3"
          width={48}
          height={48}
          priority
        />
        Router<span className="text-(--text-main)">Calc</span>
      </h1>
      <button
        className="uppercase text-xs tracking-widest text-(--text-muted) border border-(--line-color) rounded-lg px-3 py-1.5 cursor-pointer hover:text-(--text-main) hover:border-(--accent) transition-colors duration-200"
        onClick={() => setCurrentLang(currentLang === 'en' ? 'de' : 'en')}
      >
        {currentLang}
      </button>
    </header>
  );
};
