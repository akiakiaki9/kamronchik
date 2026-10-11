import Header from '@/components/Header/Header';
import MenuClient from '@/components/Menu/MenuClient';
import Footer from '@/components/Footer/Footer';
import { getMenu } from '@/lib/api';

export const metadata = {
    title: 'Клубника в шоколаде, десерты и напитки. Заказать онлайн с доставкой по Бухаре.',
    description:
        'Клубника в шоколаде, десерты и напитки. Заказать онлайн с доставкой по Бухаре.',
};

export default async function MenuPage() {
    const categories = await getMenu();

    return (
        <>
            <Header />
            <main className="k-menu-page">

                <MenuClient categories={categories} showHead={false} />
            </main>
            <Footer />
        </>
    );
}