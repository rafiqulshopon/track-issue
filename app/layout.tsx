import '@radix-ui/themes/styles.css';
import './theme-config.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import NavBar from './NavBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Track issue',
  description: 'A super simple issue tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <Theme accentColor='iris'>
          <NavBar />
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
