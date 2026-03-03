import type { Metadata } from 'next';
import './styles/globals.css';
import { LanguageProvider } from '@/app/i18n/LanguageContext';
import { Header } from '@/app/components/Header/Header';

const basePath = process.env.GITHUB_ACTIONS ? '/routerCalc' : '';

export const metadata: Metadata = {
  title: 'Router Calculator',
  description: '',
  appleWebApp: true,
  icons: {
    apple: `${basePath}/apple-touch-icon.png`
  }
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
