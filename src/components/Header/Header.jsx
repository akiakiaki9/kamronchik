'use client';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import './Header.css';

const links = [
    { href: '/', label: 'Главная' },
    { href: 'menu', label: 'Меню' },
    { href: '#about', label: 'О нас' },
    { href: '#contacts', label: 'Контакты' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Блокировка скролла фона, когда меню открыто
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Закрытие по Esc
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && open) setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className={`k-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
            <div className="k-container k-header__inner">
                <a href="/" className="k-logo" aria-label="Kamronchik — на главную" onClick={() => setOpen(false)}>
                    <img
                        src="/images/logo.png"
                        alt="Kamronchik"
                        className="k-logo__mark"
                        onError={(e) => {
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                e.currentTarget.remove();
                                const fallback = document.createElement('span');
                                fallback.className = 'k-logo__mark k-logo__mark--text';
                                fallback.textContent = 'K';
                                parent.insertBefore(fallback, parent.firstChild);
                            }
                        }}
                    />
                    <span>Kamronchik</span>
                </a>

                <nav className={`k-nav ${open ? 'is-open' : ''}`}>
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="k-nav__link" onClick={() => setOpen(false)}>
                            {l.label}
                        </a>
                    ))}
                    <div className="k-nav__socials">
                        <a href="https://www.instagram.com/kamronchik_cafe_chocoberry/" target="_blank" rel="noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://t.me/kamronchik_cafe_chocobery" target="_blank" rel="noreferrer">
                            <FaTelegramPlane />
                        </a>
                    </div>
                </nav>

                <div className="k-header__right">
                    <a href="tel:+998957191818" className="k-phone">
                        <FiPhone /> +998 95 719 18 18
                    </a>
                    <button
                        type="button"
                        className={`k-burger ${open ? 'is-open' : ''}`}
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
                        aria-expanded={open}
                        aria-controls="header-nav"
                    >
                        <FiMenu className="k-burger__icon k-burger__icon--menu" />
                        <FiX className="k-burger__icon k-burger__icon--close" />
                    </button>
                </div>
            </div>
        </header>
    );
}