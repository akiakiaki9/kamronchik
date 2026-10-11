'use client';

const PLACEHOLDER = '/images/placeholder.png';

export default function SafeImage({ src, alt, className, ...rest }) {
    return (
        <img
            src={src || PLACEHOLDER}
            alt={alt}
            className={className}
            loading="lazy"
            onError={(e) => {
                e.currentTarget.src = PLACEHOLDER;
            }}
            {...rest}
        />
    );
}