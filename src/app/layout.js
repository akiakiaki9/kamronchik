import './globals.css';

const SITE_URL = 'https://www.kamronchik.uz';
const SITE_NAME = 'Kamronchik Café & Chocoberry';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Kamronchik — Клубника в шоколаде и десерты | Доставка по Бухаре',
    template: '%s | Kamronchik',
  },
  description:
    'Клубника в шоколаде, десерты и напитки ручной работы. Доставка по всей Бухаре с 9:30 до 00:00. Заказать онлайн — Telegram-бот или сайт.',

  keywords: [
    'клубника в шоколаде',
    'клубника в шоколаде Бухара',
    'десерты Бухара',
    'доставка десертов Бухара',
    'кафе Бухара',
    'Kamronchik',
    'chocoberry',
    'торты на заказ Бухара',
    'чокобери',
    'десерты с доставкой',
  ],

  authors: [{ name: 'Kamronchik Café' }],
  creator: 'Kamronchik Café',
  publisher: 'Kamronchik Café',

  // Canonical
  alternates: {
    canonical: SITE_URL,
  },

  // Open Graph (Telegram, Facebook, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Kamronchik — Клубника в шоколаде и десерты | Доставка по Бухаре',
    description:
      'Клубника в шоколаде, десерты и напитки ручной работы. Доставка по всей Бухаре с 9:30 до 00:00.',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Kamronchik — Café & Chocoberry',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: 'Kamronchik — Клубника в шоколаде и десерты',
    description:
      'Доставка по всей Бухаре с 9:30 до 00:00. Заказать онлайн.',
    images: ['/images/og-cover.jpg'],
  },

  // Иконки
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: 'any' },
      { url: '/images/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/images/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/images/apple-touch-icon.png',
  },

  // PWA manifest
  manifest: '/manifest.webmanifest',

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Прочее
  category: 'food',
  applicationName: SITE_NAME,
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },

  // Верификация (если будешь добавлять сайт в Search Console)
  // verification: {
  //     google: 'твой-код',
  //     yandex: 'твой-код',
  // },
};

export const viewport = {
  themeColor: '#7A3018',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  // Структурированные данные для Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${SITE_URL}/#business`,
    name: 'Kamronchik Café & Chocoberry',
    alternateName: 'Kamronchik',
    description:
      'Клубника в шоколаде, десерты и напитки ручной работы. Доставка по всей Бухаре.',
    url: SITE_URL,
    telephone: '+998957191818',
    image: `${SITE_URL}/images/og-cover.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: '₽₽',
    servesCuisine: ['Десерты', 'Кофе', 'Напитки'],
    currenciesAccepted: 'UZS',
    paymentAccepted: 'Cash, Credit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'улица Мустакиллик, 1/1',
      addressLocality: 'Бухара',
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.768154,
      longitude: 64.431332,
    },
    areaServed: {
      '@type': 'City',
      name: 'Бухара',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:30',
        closes: '00:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/kamronchik_cafe_chocoberry/',
      'https://t.me/kamronchik_cafe_chocobery',
      'https://t.me/kamronchikcafe_bot',
    ],
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: false,
  };

  return (
    <html lang="ru">
      <head>
        {/* Preconnect для внешних ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Мобильный адресный бар */}
        <meta name="format-detection" content="telephone=yes" />

        {/* Гео-метки для локального SEO */}
        <meta name="geo.region" content="UZ-BU" />
        <meta name="geo.placename" content="Бухара" />
        <meta name="geo.position" content="39.768154;64.431332" />
        <meta name="ICBM" content="39.768154, 64.431332" />

        {/* JSON-LD структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}