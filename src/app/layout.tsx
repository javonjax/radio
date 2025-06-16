import type { Metadata } from 'next';
import { Nunito, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import { ThemeProvider } from '@/components/Shared/ThemeProvider';
import Player from '@/components/Shared/Player';
import StationContextProvider from '@/components/Providers/StationContext';

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
    <html className="h-full" lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${robotoMono.variable} relative flex min-h-screen w-full flex-col`}
      >
        <StationContextProvider>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Header />
            <main className="mx-auto flex w-full max-w-7xl grow flex-col p-4">{children}</main>
            <Footer />
            <Player />
          </ThemeProvider>
        </StationContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
