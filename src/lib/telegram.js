const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export const API = `https://api.telegram.org/bot${TOKEN}`;

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kamronchik.uz';

// ==================== ОТПРАВКА СООБЩЕНИЙ ====================
export async function sendMessage(chatId, text, options = {}) {
    const res = await fetch(`${API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            ...options,
        }),
        cache: 'no-store',
    });
    return res.json();
}

export async function editMessageText(chatId, messageId, text, options = {}) {
    const res = await fetch(`${API}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            ...options,
        }),
        cache: 'no-store',
    });
    return res.json();
}

export async function answerCallbackQuery(callbackId, options = {}) {
    const res = await fetch(`${API}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            callback_query_id: callbackId,
            ...options,
        }),
        cache: 'no-store',
    });
    return res.json();
}

// ==================== ТЕКСТЫ ====================
export const TEXTS = {
    welcome: `🍓 <b>Добро пожаловать в Kamronchik!</b>

Рады видеть вас в нашем кафе — здесь клубника встречается с шоколадом.

🕒 Работаем ежедневно с 9:30 до 00:00
🚗 Доставка по всей Бухаре
📍 ул. Мустакиллик, 1/1

Выберите действие 👇`,

    menu: `🍰 <b>Наше меню</b>

Клубника в шоколаде, домашние десерты, кофе и напитки.

Откройте полное меню с фото и ценами на сайте — там же можно оформить заказ с доставкой.`,

    contacts: `📞 <b>Контакты Kamronchik</b>

<b>Телефоны:</b>
• <a href="tel:+998957191818">+998 95 719 18 18</a>
• <a href="tel:+998914060105">+998 91 406 01 05</a>

<b>Адрес:</b>
улица Мустакиллик, 1/1, Бухара

<b>График:</b>
Ежедневно 9:30 – 00:00

<b>Соцсети:</b>
• <a href="https://www.instagram.com/kamronchik_cafe_chocoberry/">Instagram</a>
• <a href="https://t.me/kamronchik_cafe_chocobery">Telegram-канал</a>`,

    help: `❓ <b>Помощь</b>

<b>Что я умею:</b>
/menu — показать меню
/contacts — контакты и адрес
/start — вернуться в начало

<b>Как заказать:</b>
1. Откройте меню
2. Выберите блюда
3. Оформите заказ — мы свяжемся с вами для подтверждения

Если что-то не работает — позвоните нам: <a href="tel:+998957191818">+998 95 719 18 18</a>`,

    review: `⭐ <b>Оставить отзыв</b>

Нам очень важно ваше мнение! Откройте страницу отзыва на сайте — заполните имя, оценку и текст. Мы читаем каждый отзыв.`,

    delivery: `🚗 <b>Доставка</b>

Доставляем по всей Бухаре <b>ежедневно с 9:30 до 00:00</b>.

Стоимость доставки зависит от района — уточним по телефону.

Оформите заказ онлайн — мы свяжемся с вами для подтверждения.`,
};

// ==================== КЛАВИАТУРЫ ====================
export const KEYBOARDS = {
    main: {
        inline_keyboard: [
            [
                { text: '🍓 Меню', callback_data: 'menu' },
                { text: '📞 Контакты', callback_data: 'contacts' },
            ],
            [
                { text: '🚗 Доставка', callback_data: 'delivery' },
                { text: '⭐ Отзыв', callback_data: 'review' },
            ],
            [
                {
                    text: '🌐 Открыть сайт',
                    url: SITE_URL,
                },
            ],
        ],
    },

    menu: {
        inline_keyboard: [
            [{ text: '📖 Открыть меню на сайте', url: `${SITE_URL}/menu` }],
            [{ text: '⬅️ Назад', callback_data: 'back_main' }],
        ],
    },

    contacts: {
        inline_keyboard: [
            [
                { text: '📍 Яндекс.Карты', url: 'https://yandex.uz/maps/-/CXqcF21S' },
                { text: '📸 Instagram', url: 'https://www.instagram.com/kamronchik_cafe_chocoberry/' },
            ],
            [
                { text: '💬 Telegram-канал', url: 'https://t.me/kamronchik_cafe_chocobery' },
            ],
            [{ text: '⬅️ Назад', callback_data: 'back_main' }],
        ],
    },

    delivery: {
        inline_keyboard: [
            [{ text: '🛒 Заказать на сайте', url: `${SITE_URL}/menu` }],
            [{ text: '⬅️ Назад', callback_data: 'back_main' }],
        ],
    },

    review: {
        inline_keyboard: [
            [{ text: '⭐ Оставить отзыв', url: `${SITE_URL}/#review` }],
            [{ text: '⬅️ Назад', callback_data: 'back_main' }],
        ],
    },

    back: {
        inline_keyboard: [
            [{ text: '⬅️ Назад', callback_data: 'back_main' }],
        ],
    },
};