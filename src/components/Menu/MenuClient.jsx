'use client';
import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import OrderModal from '../OrderModal/OrderModal';
import ItemModal from '../ItemModal/ItemModal';
import './Menu.css';

const PLACEHOLDER = '/images/placeholder.svg';
const CART_KEY = 'kamronchik_cart_v1';
const DRAG_THRESHOLD = 10;

export default function MenuClient({ categories = [], withHead = true }) {
    const [cart, setCart] = useState({});
    const [openOrder, setOpenOrder] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [hydrated, setHydrated] = useState(false);
    const [activeCat, setActiveCat] = useState(null);

    const trackRef = useRef(null);
    const dragState = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        moved: false,
    });

    // ====== Активная категория = первая при загрузке ======
    useEffect(() => {
        if (activeCat === null && categories.length > 0) {
            setActiveCat(categories[0].id);
        }
    }, [categories, activeCat]);

    // ====== localStorage ======
    useEffect(() => {
        try {
            const raw = localStorage.getItem(CART_KEY);
            let saved = {};
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object') saved = parsed;
            }

            const actualById = {};
            categories.forEach((cat) => {
                cat.items.forEach((it) => {
                    actualById[it.id] = it;
                });
            });

            const synced = {};
            Object.entries(saved).forEach(([id, { qty }]) => {
                const fresh = actualById[id];
                if (fresh && fresh.in_stock) {
                    synced[id] = { item: fresh, qty };
                }
            });

            setCart(synced);
        } catch (e) {
            console.warn('Не удалось прочитать корзину:', e);
        }
        setHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        try {
            if (Object.keys(cart).length === 0) localStorage.removeItem(CART_KEY);
            else localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (e) {
            console.warn('Не удалось сохранить корзину:', e);
        }
    }, [cart, hydrated]);

    // ====== Drag ======
    const startDrag = (clientX) => {
        const el = trackRef.current;
        if (!el) return;
        dragState.current = {
            isDown: true,
            startX: clientX,
            scrollLeft: el.scrollLeft,
            moved: false,
        };
        el.classList.add('is-dragging');
    };

    const moveDrag = (clientX) => {
        const el = trackRef.current;
        if (!el || !dragState.current.isDown) return;
        const dx = clientX - dragState.current.startX;
        if (Math.abs(dx) > DRAG_THRESHOLD) dragState.current.moved = true;
        el.scrollLeft = dragState.current.scrollLeft - dx;
    };

    const endDrag = () => {
        const el = trackRef.current;
        if (!el) return;
        el.classList.remove('is-dragging');
        dragState.current.isDown = false;
        setTimeout(() => {
            dragState.current.moved = false;
        }, 0);
    };

    const scrollByAmount = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 240, behavior: 'smooth' });
    };

    const selectCategory = (id) => {
        if (dragState.current.moved) return;
        setActiveCat(id);
    };

    // ====== Cart ======
    const addToCart = (item) => {
        if (!item.in_stock) return;
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

    const currentCategory = categories.find((c) => c.id === activeCat) || categories[0];

    return (
        <section className="k-menu">
            <div className="k-container">
                {withHead && (
                    <div className="k-menu__head">
                        <span className="k-menu__kicker">Наше меню</span>
                        <h2 className="k-menu__title">Выберите и закажите онлайн</h2>
                        <p className="k-menu__subtitle">
                            Мы свяжемся с вами для подтверждения.
                        </p>
                    </div>
                )}

                {categories.length === 0 ? (
                    <div className="k-menu__empty">
                        Меню временно недоступно. Позвоните нам — мы всё расскажем 📞
                    </div>
                ) : (
                    <>
                        {/* ====== Карусель категорий ====== */}
                        <div className="k-carousel">
                            <button
                                type="button"
                                className="k-carousel__arrow k-carousel__arrow--left"
                                onClick={() => scrollByAmount(-1)}
                                aria-label="Прокрутить влево"
                            >
                                <FiChevronLeft />
                            </button>

                            <div
                                className="k-carousel__track"
                                ref={trackRef}
                                onMouseDown={(e) => startDrag(e.clientX)}
                                onMouseMove={(e) => moveDrag(e.clientX)}
                                onMouseUp={endDrag}
                                onMouseLeave={endDrag}
                                onTouchStart={(e) => startDrag(e.touches[0].clientX)}
                                onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
                                onTouchEnd={endDrag}
                                onTouchCancel={endDrag}
                                role="tablist"
                                aria-label="Категории меню"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeCat === cat.id}
                                        className={`k-chip ${activeCat === cat.id ? 'is-active' : ''}`}
                                        onClick={() => selectCategory(cat.id)}
                                    >
                                        <span className="k-chip__label">{cat.name}</span>
                                        <span className="k-chip__count">{cat.items.length}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="k-carousel__arrow k-carousel__arrow--right"
                                onClick={() => scrollByAmount(1)}
                                aria-label="Прокрутить вправо"
                            >
                                <FiChevronRight />
                            </button>
                        </div>

                        {/* ====== Список блюд активной категории ====== */}
                        {currentCategory && (
                            <div className="k-category">
                                <h3 className="k-category__title">
                                    {currentCategory.name}
                                </h3>
                                <div className="k-grid">
                                    {currentCategory.items.map((item) => {
                                        const out = !item.in_stock;
                                        return (
                                            <div key={item.id} className={`k-card ${out ? 'is-out' : ''}`}>
                                                <button
                                                    type="button"
                                                    className="k-card__image"
                                                    onClick={() => setSelectedItem(item)}
                                                    aria-label={`Подробнее: ${item.name}`}
                                                >
                                                    {out && <span className="k-card__badge">Нет в наличии</span>}
                                                    <img
                                                        src={item.image || PLACEHOLDER}
                                                        alt={item.name}
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.currentTarget.src = PLACEHOLDER;
                                                        }}
                                                    />
                                                    <span className="k-card__zoom">Подробнее</span>
                                                </button>

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
                                                    {out ? (
                                                        <>
                                                            <span className="k-card__out">Нет в наличии</span>
                                                            <button
                                                                type="button"
                                                                className="k-card__add"
                                                                disabled
                                                                aria-label="Нет в наличии"
                                                                title="Нет в наличии"
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="k-card__price">
                                                                {formatPrice(item.price)}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="k-card__add"
                                                                onClick={() => addToCart(item)}
                                                                aria-label="Добавить"
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

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

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    formatPrice={formatPrice}
                    onAdd={(it) => {
                        addToCart(it);
                        setSelectedItem(null);
                    }}
                    onClose={() => setSelectedItem(null)}
                />
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