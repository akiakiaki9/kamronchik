'use client';
import { useEffect, useState } from 'react';
import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const BG_IMAGES = [
    '/images/interior-1.jpg',
    '/images/interior-2.jpg',
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    // 🖼 Предзагружаем картинки, чтобы не мигали при смене
    useEffect(() => {
        BG_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // 🔄 Автосмена каждые 6 секунд
    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % BG_IMAGES.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="k-hero">
            {/* 🎬 Фоновые слайды — видны только на мобилке */}
            <div className="k-hero__bg" aria-hidden="true">
                {BG_IMAGES.map((src, i) => (
                    <div
                        key={src}
                        className={`k-hero__bg-slide ${i === current ? 'is-active' : ''}`}
                        style={{ backgroundImage: `url(${src})` }}
                    />
                ))}
                <div className="k-hero__bg-overlay" />
            </div>

            <div className="k-hero__glow" />

            <div className="k-container k-hero__inner">
                <div className="k-hero__content">
                    <span className="k-hero__badge">🍓 Свежие десерты каждый день</span>
                    <h1 className="k-hero__title">
                        Клубника в шоколаде <br />
                        и другие <span>вкусности</span>
                    </h1>
                    <p className="k-hero__desc">
                        Десерты, напитки и сладости ручной работы.
                        Доставка по всей Бухаре с 9:30 до 00:00.
                    </p>
                    <div className="k-hero__actions">
                        <a href="#menu" className="k-btn k-btn--primary">
                            Смотреть меню <FiArrowRight />
                        </a>
                        <a
                            href="https://t.me/kamronchikcafe_bot"
                            target="_blank"
                            rel="noreferrer"
                            className="k-btn k-btn--ghost"
                        >
                            Заказать в Telegram
                        </a>
                    </div>
                    <div className="k-hero__meta">
                        <span><FiClock /> 9:30 – 00:00</span>
                        <span><FiMapPin /> ул. Мустакиллик, 1/1, Бухара</span>
                    </div>
                </div>

                <div className="k-hero__art">
                    <div className="k-hero__circle" />
                    <div className="k-hero__emoji">🍓</div>
                </div>
            </div>
        </section>
    );
}