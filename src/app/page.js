import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import MenuPreview from '@/components/MenuPreview/MenuPreview';
import Footer from '@/components/Footer/Footer';
import { getMenu } from '@/lib/api';
import Contacts from '@/components/Contacts/Contatcs';

export default async function HomePage() {
    const categories = await getMenu();
    const firstCat = categories[0];
    const preview = firstCat?.items?.slice(0, 6) || [];

    return (
        <>
            <Header />
            <main>
                <Hero />
                <MenuPreview items={preview} category={firstCat} />
                <Contacts />
            </main>
            <Footer />
        </>
    );
}