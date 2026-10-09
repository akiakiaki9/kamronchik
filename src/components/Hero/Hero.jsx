import { FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
    return (
        <section className="k-hero">
            <div className="k-hero__glow" />
            <div className="k-container k-hero__inner">
                <div>
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