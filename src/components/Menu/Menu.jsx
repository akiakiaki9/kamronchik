'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiShoppingBag } from 'react-icons/fi';
import { categories } from '@/data/menu';
import OrderModal from '../OrderModal/OrderModal';
import './Menu.css';

const PLACEHOLDER = '/images/placeholder.png';
const CART_KEY = 'kamronchik_cart_v1';

export default function Menu() {
    const [cart, setCart] = useState({});
    const [openOrder, setOpenOrder] = useState(false);
    const [hydrated, setHydrated] = useState(false); // ← чтобы не мигало до загрузки

    // 📥 Загружаем корзину из localStorage при монтировании
    useEffect(() => {
        try {
            const raw = localStorage.getItem(CART_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') {
                    setCart(parsed);
                }
            }
        } catch (e) {
            console.warn('Не удалось прочитать корзину:', e);
        }
        setHydrated(true);
    }, []);

    // 💾 Сохраняем корзину в localStorage при каждом изменении
    useEffect(() => {
        if (!hydrated) return;
        try {
            if (Object.keys(cart).length === 0) {
                localStorage.removeItem(CART_KEY);
            } else {
                localStorage.setItem(CART_KEY, JSON.stringify(cart));
            }
        } catch (e) {
            console.warn('Не удалось сохранить корзину:', e);
        }
    }, [cart, hydrated]);

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev[item.id];
            return { ...prev, [item.id]: { item, qty: exists ? exists.qty + 1 : 1 } };
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => {
            const next = { ...prev };
            if (!next[id]) return prev;
            if (next[id].qty <= 1) delete next[id];
            else next[id] = { ...next[id], qty: next[id].qty - 1 };
            return next;
        });
    };

    const clearCart = () => setCart({});

    const totalItems = Object.values(cart).reduce((s, v) => s + v.qty, 0);
    const totalPrice = Object.values(cart).reduce((s, v) => s + v.qty * v.item.price, 0);
    const formatPrice = (n) => n.toLocaleString('ru-RU') + ' сум';

    return (
        <section id="menu" className="k-menu">
            <div className="k-container">
                <div className="k-menu__head">
                    <span className="k-menu__kicker">Наше меню</span>
                    <h2 className="k-menu__title">Выберите и закажите онлайн</h2>
                    <p className="k-menu__subtitle">
                        Заказ придёт напрямую в наш Telegram — мы свяжемся с вами для подтверждения.
                    </p>
                </div>

                {categories.map((cat) => (
                    <div key={cat.id} className="k-category">
                        <h3 className="k-category__title">
                            <span className="k-category__icon">{cat.icon}</span>
                            {cat.title}
                        </h3>
                        <div className="k-grid">
                            {cat.items.map((item) => (
                                <div key={item.id} className="k-card">
                                    <div className="k-card__image">
                                        <img
                                            src={item.image || PLACEHOLDER}
                                            alt={item.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = PLACEHOLDER;
                                            }}
                                        />
                                    </div>

                                    <div className="k-card__body">
                                        <h4 className="k-card__name">{item.name}</h4>
                                        {item.ingredients && (
                                            <p className="k-card__desc">{item.ingredients}</p>
                                        )}
                                        {item.weight && (
                                            <span className="k-card__weight">{item.weight}</span>
                                        )}
                                    </div>

                                    <div className="k-card__foot">
                                        <span className="k-card__price">{formatPrice(item.price)}</span>
                                        <button
                                            className="k-card__add"
                                            onClick={() => addToCart(item)}
                                            aria-label="Добавить"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🛒 Плавающая корзина в правом нижнем углу */}
            {hydrated && totalItems > 0 && (
                <button
                    className="k-floating-cart"
                    onClick={() => setOpenOrder(true)}
                    aria-label="Открыть корзину"
                >
                    <span className="k-floating-cart__badge">{totalItems}</span>
                    <FiShoppingBag className="k-floating-cart__icon" />
                    <span className="k-floating-cart__price">{formatPrice(totalPrice)}</span>
                </button>
            )}

            {openOrder && (
                <OrderModal
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    totalPrice={totalPrice}
                    formatPrice={formatPrice}
                    onClose={() => setOpenOrder(false)}
                />
            )}
        </section>
    );
}