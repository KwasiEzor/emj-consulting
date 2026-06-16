import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { Providers } from '../providers';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#1a2f4a] to-[#0B1F3A] text-white antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
