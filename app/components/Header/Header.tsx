'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/i18n/LanguageContext';
import { useEffect } from 'react';
import logo from '@/app/assets/logo';

export const Header = () => {
  const { currentLang, setCurrentLang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return (
    <header>
      <h1>
        <Image
          src={logo}
          alt="Router Calculator logo"
          className="mr-3"
          width={48}
          height={48}
          priority
        />
        Router<span className="text-(--text-main)">Calc</span>
      </h1>
      <button
        className="btn-subtle btn-subtle--accent"
        onClick={() => setCurrentLang(currentLang === 'en' ? 'de' : 'en')}
      >
        {currentLang}
      </button>
    </header>
  );
};
