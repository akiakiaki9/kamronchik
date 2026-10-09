import './globals.css';

export const metadata = {
  title: 'Kamronchik — Café & Chocoberry | Доставка по Бухаре',
  description:
    'Клубника в шоколаде, десерты и напитки. Доставка по Бухаре с 9:30 до 00:00. Заказать онлайн.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}