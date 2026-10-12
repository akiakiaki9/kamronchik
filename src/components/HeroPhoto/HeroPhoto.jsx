'use client';
import './HeroPhoto.css';

export default function HeroPhoto({ src, alt }) {
    return (
        <figure className="k-page-hero__photo">
            <img
                src={src}
                alt={alt}
                loading="eager"
                decoding="async"
                onError={(e) => {
                    // если фото нет — тихо скрываем весь блок
                    e.currentTarget.parentElement.style.display = 'none';
                }}
            />
        </figure>
    );
}