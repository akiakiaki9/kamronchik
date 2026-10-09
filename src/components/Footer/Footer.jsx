import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    return (
        <footer id="contacts" className="k-footer">
            <div className="k-container">
                <div className="k-footer__grid">
                    <div id="about">
                        <div className="k-footer__brand">Kamronchik</div>
                        <div className="k-footer__brand-sub">Café &amp; Chocoberry</div>
                        <p className="k-footer__text">
                            Клубника в шоколаде, десерты и напитки.
                            Готовим с любовью и доставляем по всей Бухаре.
                        </p>
                        <div className="k-footer__socials">
                            <a
                                href="https://www.instagram.com/kamronchik_cafe_chocoberry/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://t.me/kamronchik_cafe_chocobery"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Telegram канал"
                            >
                                <FaTelegramPlane />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="k-footer__heading">Контакты</h4>
                        <ul className="k-footer__list">
                            <li>
                                <a href="tel:+998957191818"><FiPhone /> +998 95 719 18 18</a>
                            </li>
                            <li>
                                <a href="tel:+998914060105"><FiPhone /> +998 91 406 01 05</a>
                            </li>
                            <li>
                                <a href="https://t.me/kamronchikcafe_bot" target="_blank" rel="noreferrer">
                                    <FaTelegramPlane /> Telegram-бот
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="k-footer__heading">Адрес</h4>
                        <ul className="k-footer__list">
                            <li>
                                <span><FiMapPin /> ул. Мустакиллик, 1/1, Бухара</span>
                            </li>
                            <li>
                                <span><FiClock /> Ежедневно 9:30 – 00:00</span>
                            </li>
                            <li>
                                <a
                                    href="https://yandex.uz/maps/-/CXqcF21S"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Открыть на карте →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="k-footer__bottom">
                    <span>© {new Date().getFullYear()} Kamronchik Café</span>
                    <span>Доставка по Бухаре · 9:30 – 00:00</span>
                </div>
            </div>
        </footer>
    );
}