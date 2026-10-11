'use client';
import { useState } from 'react';
import { FiX, FiMinus, FiPlus, FiCheck, FiMapPin, FiLoader } from 'react-icons/fi';
import './OrderModal.css';

export default function OrderModal({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    formatPrice,
    onClose,
}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [coords, setCoords] = useState(null); // { lat, lng }
    const [geoStatus, setGeoStatus] = useState('idle'); // idle | loading | ok | error
    const [geoError, setGeoError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    const items = Object.values(cart);

    // 📍 Определение локации
    const detectLocation = () => {
        if (!('geolocation' in navigator)) {
            setGeoStatus('error');
            setGeoError('Геолокация не поддерживается устройством');
            return;
        }
        setGeoStatus('loading');
        setGeoError('');

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lng: longitude });
                setGeoStatus('ok');
            },
            (err) => {
                setGeoStatus('error');
                if (err.code === err.PERMISSION_DENIED) {
                    setGeoError('Доступ к геолокации запрещён');
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    setGeoError('Не удалось определить местоположение');
                } else {
                    setGeoError('Ошибка определения локации');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    };

    const clearLocation = () => {
        setCoords(null);
        setGeoStatus('idle');
        setGeoError('');
    };

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (!name.trim() || !phone.trim() || !address.trim()) {
            setError('Заполните имя, телефон и адрес');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    comment,
                    lat: coords?.lat ?? null,
                    lng: coords?.lng ?? null,
                    items: items.map(({ item, qty }) => ({
                        name: item.name,
                        price: item.price,
                        qty,
                    })),
                    total: totalPrice,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка отправки');

            setDone(true);

            // 🧹 Очищаем корзину после успешного заказа
            if (typeof clearCart === 'function') {
                clearCart();
            } else {
                console.warn('⚠ clearCart не передан в OrderModal');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="k-overlay" onClick={onClose}>
            <div className="k-modal" onClick={(e) => e.stopPropagation()}>
                <button className="k-modal__close" onClick={onClose} aria-label="Закрыть">
                    <FiX />
                </button>

                {done ? (
                    <div className="k-success">
                        <div className="k-success__icon"><FiCheck /></div>
                        <h3>Заказ отправлен!</h3>
                        <p>Мы свяжемся с вами в ближайшее время для подтверждения.</p>
                        <button className="k-form__submit" onClick={onClose}>Отлично</button>
                    </div>
                ) : (
                    <>
                        <h3 className="k-modal__title">Оформление заказа</h3>

                        <div className="k-cart-list">
                            {items.map(({ item, qty }) => (
                                <div key={item.id} className="k-cart-row">
                                    <div className="k-cart-thumb">
                                        <img
                                            src={item.image || '/images/placeholder.svg'}
                                            alt={item.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/placeholder.svg';
                                            }}
                                        />
                                    </div>

                                    <div className="k-cart-info">
                                        <span>{item.name}</span>
                                        <small>{formatPrice(item.price)}</small>
                                    </div>

                                    <div className="k-qty">
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Меньше"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span>{qty}</span>
                                        <button
                                            type="button"
                                            onClick={() => addToCart(item)}
                                            aria-label="Больше"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="k-total">
                                <span>Итого:</span>
                                <strong>{formatPrice(totalPrice)}</strong>
                            </div>
                        </div>

                        <form onSubmit={submit} className="k-form">
                            <input
                                placeholder="Ваше имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                placeholder="Телефон"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            {/* Адрес + кнопка геолокации */}
                            <div className="k-form__address">
                                <input
                                    placeholder="Адрес доставки"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className={`k-geo-btn ${coords ? 'is-active' : ''}`}
                                    onClick={coords ? clearLocation : detectLocation}
                                    disabled={geoStatus === 'loading'}
                                    aria-label={coords ? 'Убрать локацию' : 'Определить локацию'}
                                    title={coords ? 'Убрать геометку' : 'Определить мою локацию'}
                                >
                                    {geoStatus === 'loading' ? <FiLoader className="k-spin" /> : <FiMapPin />}
                                </button>
                            </div>

                            {coords && (
                                <div className="k-geo-info">
                                    <FiMapPin />
                                    <span>
                                        Локация добавлена: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                                    </span>
                                    <a
                                        href={`https://yandex.uz/maps/?pt=${coords.lng},${coords.lat}&z=17&l=map`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Проверить
                                    </a>
                                </div>
                            )}

                            {geoError && <div className="k-geo-error">{geoError}</div>}

                            <textarea
                                placeholder="Комментарий (необязательно)"
                                rows={2}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            {error && <div className="k-error">{error}</div>}

                            <button className="k-form__submit" disabled={loading}>
                                {loading ? 'Отправляем...' : 'Оформить заказ'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}