import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import MenuClient from '@/components/Menu/MenuClient';
import Footer from '@/components/Footer/Footer';
import { getMenu } from '@/lib/api';
import Contacts from '@/components/Contacts/Contatcs';

export default async function HomePage() {
    const categories = await getMenu();

    return (
        <>
            <Header />
            <main>
                <Hero />
                <MenuClient categories={categories} withHead />
                <Contacts />
            </main>
            <Footer />
        </>
    );
}