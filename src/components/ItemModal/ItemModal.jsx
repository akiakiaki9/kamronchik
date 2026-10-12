'use client';
import { useEffect } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import './ItemModal.css';

const PLACEHOLDER = '/images/placeholder.svg';

export default function ItemModal({ item, formatPrice, onAdd, onClose }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const out = !item.in_stock;

    return (
        <div className="k-overlay" onClick={onClose}>
            <div
                className="k-modal k-modal--item"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={item.name}
            >
                {/* Кнопка закрытия */}
                <button
                    type="button"
                    className="k-modal__close k-item__close"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <FiX />
                </button>

                <div className="k-item__image">
                    {out && <span className="k-item__badge">Нет в наличии</span>}
                    <img
                        src={item.image || PLACEHOLDER}
                        alt={item.name}
                        loading="eager"
                        onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER;
                        }}
                    />
                </div>

                <div className="k-item__body">
                    <h3 className="k-item__name">{item.name}</h3>

                    {/* Скроллируемая часть */}
                    <div className="k-item__scroll">
                        {item.ingredients && (
                            <>
                                <span className="k-item__label">Состав</span>
                                <p className="k-item__desc">{item.ingredients}</p>
                            </>
                        )}
                    </div>

                    <div className="k-item__meta">
                        {item.weight && (
                            <span className="k-item__chip">{item.weight}</span>
                        )}
                        {out && (
                            <span className="k-item__chip k-item__chip--out">
                                Нет в наличии
                            </span>
                        )}
                    </div>

                    <div className="k-item__foot">
                        <span className="k-item__price">{formatPrice(item.price)}</span>

                        {out ? (
                            <button
                                type="button"
                                className="k-item__add k-item__add--disabled"
                                disabled
                            >
                                <FiX /> Нет в наличии
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="k-item__add"
                                onClick={() => onAdd(item)}
                            >
                                <FiPlus /> В корзину
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}