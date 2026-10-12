import Header from '@/components/Header/Header';
import MenuClient from '@/components/Menu/MenuClient';
import Footer from '@/components/Footer/Footer';
import { getMenu } from '@/lib/api';
import './menu-page.css';

const SITE_URL = 'https://www.kamronchik.uz';

export const metadata = {
    title: 'Меню — Клубника в шоколаде, десерты, напитки',
    description:
        'Полное меню Kamronchik: клубника в шоколаде, десерты, кофе и напитки. Цены, состав, фото. Заказать с доставкой по Бухаре.',
    alternates: {
        canonical: `${SITE_URL}/menu`,
    },
    openGraph: {
        title: 'Меню Kamronchik — Клубника в шоколаде, десерты, напитки',
        description:
            'Полное меню: клубника в шоколаде, десерты, кофе и напитки. Доставка по Бухаре.',
        url: `${SITE_URL}/menu`,
        type: 'website',
        images: [
            {
                url: '/images/og-menu.jpg',
                width: 1200,
                height: 630,
                alt: 'Меню Kamronchik',
            },
        ],
    },
};

export default async function MenuPage() {
    const categories = await getMenu();

    return (
        <>
            <Header />
            <main className="k-menu-page">
                <section className="k-page-hero">
                    {/* 🖼 Фоновое фото */}
                    <div className="k-page-hero__bg" aria-hidden="true">
                        <img
                            src="/images/interior-1.JPG"
                            alt=""
                            loading="eager"
                            decoding="async"
                        />
                        <div className="k-page-hero__overlay" />
                    </div>

                    {/* 📝 Текст поверх фото */}
                    <div className="k-container k-page-hero__content">
                        <span className="k-page-hero__kicker">Kamronchik</span>
                        <h1 className="k-page-hero__title">Наше меню</h1>
                        <p className="k-page-hero__subtitle">
                            Клубника в шоколаде, десерты и напитки.
                            Заказывайте онлайн — доставим по всей Бухаре с 9:30 до 00:00.
                        </p>
                    </div>
                </section>

                <MenuClient categories={categories} withHead={false} />
            </main>
            <Footer />
        </>
    );
}