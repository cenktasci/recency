import './globals.css';
import { Inter } from 'next/font/google';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './context/AdminContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Recency',
  description: 'Industrial washing machines and solutions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AdminProvider>
      </body>
    </html>
  );
} 