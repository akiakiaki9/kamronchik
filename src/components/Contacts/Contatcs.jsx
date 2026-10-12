'use client';
import { useState, useEffect } from 'react';
import { FiPhone, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import ReviewModal from '../ReviewModal/ReviewModal';
import './Contacts.css';

const PHONES = [
    { label: '+998 95 719 18 18', href: 'tel:+998957191818' },
    { label: '+998 91 406 01 05', href: 'tel:+998914060105' },
];

const LAT = 39.768154;
const LNG = 64.431332;

const YANDEX_MAP_EMBED = `https://yandex.uz/map-widget/v1/?ll=${LNG}%2C${LAT}&z=17&pt=${LNG},${LAT},pm2rdm`;
const YANDEX_MAP_LINK = 'https://yandex.uz/maps/-/CXqcF21S';

// 📸 Вертикальные фото кафе / десертов
const GALLERY = [
    {
        src: '/images/interior-1.jpg',
        alt: 'Клубника в шоколаде — Kamronchik',
    },
    {
        src: '/images/interior-2.jpg',
        alt: 'Десерты и напитки — Kamronchik',
    },
];

export default function Contacts() {
    const [reviewOpen, setReviewOpen] = useState(false);

    // 🔗 Открываем модалку, если в URL есть #review
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#review') {
                setReviewOpen(true);
            }
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    const closeReview = () => {
        setReviewOpen(false);
        if (window.location.hash === '#review') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    const openReview = () => setReviewOpen(true);

    return (
        <section id="contacts" className="k-contacts">
            <div className="k-container">
                <div className="k-contacts__head">
                    <span className="k-contacts__kicker">Как нас найти</span>
                    <h2 className="k-contacts__title">Контакты и адрес</h2>
                    <p className="k-contacts__subtitle">
                        Доставка по всей Бухаре — с 9:30 до 00:00. Позвоните, напишите в Telegram или загляните к нам.
                    </p>
                </div>

                <div className="k-contacts__grid">
                    {/* Левая колонка */}
                    <div className="k-contacts__info">
                        <div className="k-contacts__block">
                            <h4 className="k-contacts__heading"><FiPhone /> Телефоны</h4>
                            <ul className="k-contacts__list">
                                {PHONES.map((p) => (
                                    <li key={p.href}>
                                        <a href={p.href} className="k-contacts__link">{p.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="k-contacts__block">
                            <h4 className="k-contacts__heading"><FaTelegramPlane /> Онлайн-заказ</h4>
                            <ul className="k-contacts__list">
                                <li>
                                    <a href="https://t.me/kamronchikcafe_bot" target="_blank" rel="noreferrer" className="k-contacts__link">
                                        Telegram-бот для заказов
                                    </a>
                                </li>
                                <li>
                                    <a href="https://t.me/kamronchik_cafe_chocobery" target="_blank" rel="noreferrer" className="k-contacts__link">
                                        Telegram-канал
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="k-contacts__block">
                            <h4 className="k-contacts__heading"><FaInstagram /> Соцсети</h4>
                            <ul className="k-contacts__list">
                                <li>
                                    <a
                                        href="https://www.instagram.com/kamronchik_cafe_chocoberry/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="k-contacts__link"
                                    >
                                        @kamronchik_cafe_chocoberry
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="k-contacts__block">
                            <h4 className="k-contacts__heading"><FiClock /> График работы</h4>
                            <ul className="k-contacts__list">
                                <li>Ежедневно · 9:30 – 00:00</li>
                            </ul>
                        </div>

                        <button className="k-review-btn" onClick={openReview}>
                            <FiStar />
                            <span>Оставить отзыв</span>
                        </button>
                    </div>

                    {/* Правая колонка: адрес + карта + галерея */}
                    <div className="k-contacts__map-wrap">
                        <div className="k-contacts__address">
                            <div className="k-contacts__address-icon"><FiMapPin /></div>
                            <div className="k-contacts__address-text">
                                <span className="k-contacts__address-label">Адрес</span>
                                <span className="k-contacts__address-value">улица Мустакиллик, 1/1, Бухара</span>
                            </div>
                            <a href={YANDEX_MAP_LINK} target="_blank" rel="noreferrer" className="k-contacts__address-link">
                                Открыть →
                            </a>
                        </div>

                        <div className="k-contacts__map">
                            <iframe
                                src={YANDEX_MAP_EMBED}
                                title="Kamronchik на карте"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* 📸 Галерея из 2 фото */}
                        <div className="k-contacts__gallery">
                            {GALLERY.map((img) => (
                                <figure key={img.src} className="k-contacts__photo">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {reviewOpen && <ReviewModal onClose={closeReview} />}
        </section>
    );
}