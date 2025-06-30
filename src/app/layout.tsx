import type { Metadata } from 'next';
import { Nunito, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Shared/Header';
import Footer from '@/components/Shared/Footer';
import { ThemeProvider } from '@/components/Shared/ThemeProvider';
import Player from '@/components/Shared/Player/Player';
import IconGradient from '@/components/Shared/IconGradient';
import { Toaster } from '@/components/ui/sonner';
import { StationContextProvider } from '@/components/ContextProviders/StationContext';
import { LocationContextProvider } from '@/components/ContextProviders/LocationContext';
import QueryProvider from '@/components/QueryProvider/QueryProvider';

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
        <QueryProvider>
          <LocationContextProvider>
            <StationContextProvider>
              <ThemeProvider
                attribute="class"
                enableSystem
                defaultTheme="system"
                disableTransitionOnChange
              >
                <IconGradient />
                <Toaster richColors closeButton visibleToasts={1} />
                <Header />
                <main className="mx-auto flex w-full max-w-7xl grow flex-col p-4">{children}</main>
                <Footer />
                <Player />
              </ThemeProvider>
            </StationContextProvider>
          </LocationContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
