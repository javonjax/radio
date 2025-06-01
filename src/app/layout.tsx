import type { Metadata } from 'next';
import { Nunito, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Footer from './components/Shared/Footer/Footer';
import Header from './components/Shared/Header/Header';

// Fonts.
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Tune Tide - Ride the airwaves',
  description: 'Radio browser application.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${nunito.variable} ${robotoMono.variable} flex min-h-screen w-full flex-col`}
      >
        <Header />
        <main className="mx-auto flex w-full max-w-7xl grow flex-col p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
