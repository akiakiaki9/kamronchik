'use client';
import { useState } from 'react';
import { FiX, FiStar, FiCheck } from 'react-icons/fi';
import './ReviewModal.css';

export default function ReviewModal({ onClose }) {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (rating < 1) {
            setError('Поставьте оценку');
            return;
        }
        if (text.trim().length < 3) {
            setError('Напишите хотя бы пару слов');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, contact, rating, text }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || 'Ошибка отправки');
            setDone(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const activeRating = hover || rating;

    return (
        <div className="k-overlay" onClick={onClose}>
            <div className="k-modal k-modal--review" onClick={(e) => e.stopPropagation()}>
                <button className="k-modal__close" onClick={onClose} aria-label="Закрыть">
                    <FiX />
                </button>

                {done ? (
                    <div className="k-success">
                        <div className="k-success__icon"><FiCheck /></div>
                        <h3>Спасибо за отзыв!</h3>
                        <p>Мы очень ценим ваше мнение — оно помогает нам становиться лучше.</p>
                        <button className="k-form__submit" onClick={onClose}>Закрыть</button>
                    </div>
                ) : (
                    <>
                        <h3 className="k-modal__title">Оставить отзыв</h3>
                        <p className="k-review__subtitle">
                            Расскажите, как вам наш кофе, десерты и сервис. Мы читаем каждый отзыв 💛
                        </p>

                        <form onSubmit={submit} className="k-form">
                            {/* Звёзды */}
                            <div className="k-rating" role="radiogroup" aria-label="Оценка">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        className={`k-rating__star ${activeRating >= n ? 'is-active' : ''}`}
                                        onClick={() => setRating(n)}
                                        onMouseEnter={() => setHover(n)}
                                        onMouseLeave={() => setHover(0)}
                                        aria-label={`${n} из 5`}
                                    >
                                        <FiStar />
                                    </button>
                                ))}
                                <span className="k-rating__label">
                                    {rating > 0 ? `${rating} / 5` : 'Поставьте оценку'}
                                </span>
                            </div>

                            <input
                                placeholder="Ваше имя (необязательно)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                placeholder="Телефон или @username (необязательно)"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                            <textarea
                                placeholder="Ваш отзыв..."
                                rows={4}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            />

                            {error && <div className="k-error">{error}</div>}

                            <button className="k-form__submit" disabled={loading}>
                                {loading ? 'Отправляем...' : 'Отправить отзыв'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}