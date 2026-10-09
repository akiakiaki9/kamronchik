import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import MenuClient from '@/components/Menu/MenuClient';
import Footer from '@/components/Footer/Footer';
import Contacts from '@/components/Contacts/Contatcs';

async function getMenu() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/`, {
      next: { revalidate: 60 }, // кэш 60 сек — админ обновит, через минуту увидишь
    });
    if (!res.ok) {
      console.error('Menu fetch failed:', res.status);
      return [];
    }
    return await res.json();
  } catch (e) {
    console.error('Menu fetch error:', e);
    return [];
  }
}

export default async function HomePage() {
  const categories = await getMenu();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuClient categories={categories} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}