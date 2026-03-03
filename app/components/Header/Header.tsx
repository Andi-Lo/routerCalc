'use client';

import Image from 'next/image';
import routerLogo from '../../../public/routerCalcLogo.png';
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
          src={routerLogo}
          alt="Router Calculator logo"
          className="mr-3"
          width={48}
          height={48}
        />
        Router<span className="text-(--text-main)">Calc</span>
      </h1>
      <button
        className="btn-subtle btn-subtle--accent"
        onClick={() => setCurrentLang(currentLang === 'en' ? 'de' : 'en')}
        aria-label={`Switch language to ${currentLang === 'en' ? 'German' : 'English'}`}
      >
        {currentLang.toUpperCase()}
      </button>
    </header>
  );
};
