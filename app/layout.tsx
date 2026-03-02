import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/app/Header/Header';
import { LanguageProvider } from '@/app/i18n/LanguageContext';

export const metadata: Metadata = {
  title: 'Router Calculator',
  description: '',
  appleWebApp: true
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </LanguageProvider>
  );
}
