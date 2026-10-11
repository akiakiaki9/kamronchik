import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import SafeImage from '../SafeImage/SafeImage';
import './MenuPreview.css';

const formatPrice = (n) => n.toLocaleString('ru-RU') + ' сум';

export default function MenuPreview({ items = [], category }) {
    if (!items.length) return null;

    return (
        <section className="k-preview">
            <div className="k-container">
                <div className="k-preview__head">
                    <span className="k-preview__kicker">Популярное</span>
                    <h2 className="k-preview__title">Из нашего меню</h2>
                    <p className="k-preview__subtitle">
                        {category?.name || 'Свежие десерты и напитки каждый день'}
                    </p>
                </div>

                <div className="k-preview__grid">
                    {items.map((item) => {
                        const out = !item.in_stock;
                        return (
                            <Link
                                key={item.id}
                                href="/menu"
                                className={`k-preview__card ${out ? 'is-out' : ''}`}
                            >
                                <div className="k-preview__image">
                                    {out && <span className="k-preview__badge">Нет в наличии</span>}
                                    <SafeImage src={item.image} alt={item.name} />
                                </div>
                                <div className="k-preview__body">
                                    <h3 className="k-preview__name">{item.name}</h3>
                                    <div className="k-preview__foot">
                                        <span className="k-preview__price">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="k-preview__actions">
                    <Link href="/menu" className="k-btn k-btn--primary">
                        Смотреть всё меню <FiArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}