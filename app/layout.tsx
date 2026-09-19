import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mustafa Ali — Dentist & 3D Designer',
  description: 'Portfolio of Mustafa Ali: Dentist, Exocad Expert, 3D Designer, and Endodontics Specialist.',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Mustafa Ali — Dentist & 3D Designer',
    description: 'Portfolio of Mustafa Ali: Dentist, Exocad Expert, 3D Designer, and Endodontics Specialist.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustafa Ali — Dentist & 3D Designer',
    description: 'Portfolio of Mustafa Ali: Dentist, Exocad Expert, 3D Designer, and Endodontics Specialist.',
  },
};

const themeBootstrap = `(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

