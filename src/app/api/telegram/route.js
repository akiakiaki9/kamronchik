import { NextResponse } from 'next/server';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;
const SITE_URL = 'https://www.kamronchik.uz';

// ==================== ОТПРАВКА ====================
async function sendMessage(chatId, text, replyMarkup) {
    const res = await fetch(`${API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: replyMarkup,
        }),
        cache: 'no-store',
    });
    const data = await res.json();
    console.log('[TG] sendMessage →', JSON.stringify(data));
    return data;
}

async function editMessage(chatId, messageId, text, replyMarkup) {
    const res = await fetch(`${API}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            message_id: messageId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
            reply_markup: replyMarkup,
        }),
        cache: 'no-store',
    });
    const data = await res.json();
    console.log('[TG] editMessage →', JSON.stringify(data));
    return data;
}

async function answerCallback(callbackId) {
    await fetch(`${API}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackId }),
        cache: 'no-store',
    });
}

// ==================== ТЕКСТЫ ====================
const TEXTS = {
    welcome: `🍓 <b>Добро пожаловать в Kamronchik!</b>

Рады видеть вас в нашем кафе — здесь клубника встречается с шоколадом.

🕒 Работаем ежедневно с 9:30 до 00:00
🚗 Доставка по всей Бухаре
📍 ул. Мустакиллик, 1/1

Выберите действие 👇`,

    menu: `🍰 <b>Наше меню</b>

Клубника в шоколаде, домашние десерты, кофе и напитки.

Откройте полное меню с фото и ценами — там же можно оформить заказ с доставкой.`,

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

    delivery: `🚗 <b>Доставка</b>

Доставляем по всей Бухаре ежедневно с 9:30 до 00:00.

Оформите заказ онлайн — мы свяжемся с вами для подтверждения.`,

    review: `⭐ <b>Оставить отзыв</b>

Нам очень важно ваше мнение! Откройте страницу отзыва — заполните имя, оценку и текст.`,

    help: `❓ <b>Помощь</b>

<b>Что я умею:</b>
/menu — показать меню
/contacts — контакты и адрес
/start — вернуться в начало

Если что-то не работает — позвоните: <a href="tel:+998957191818">+998 95 719 18 18</a>`,
};

// ==================== КЛАВИАТУРЫ ====================
const KB = {
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
            [{ text: '🌐 Открыть сайт', url: SITE_URL }],
        ],
    },
    menu: {
        inline_keyboard: [
            [{ text: '📖 Открыть меню', url: `${SITE_URL}/menu` }],
            [{ text: '⬅️ Назад', callback_data: 'back' }],
        ],
    },
    contacts: {
        inline_keyboard: [
            [
                { text: '📍 Яндекс.Карты', url: 'https://yandex.uz/maps/-/CXqcF21S' },
                { text: '📸 Instagram', url: 'https://www.instagram.com/kamronchik_cafe_chocoberry/' },
            ],
            [{ text: '💬 Telegram-канал', url: 'https://t.me/kamronchik_cafe_chocobery' }],
            [{ text: '⬅️ Назад', callback_data: 'back' }],
        ],
    },
    delivery: {
        inline_keyboard: [
            [{ text: '🛒 Заказать', url: `${SITE_URL}/menu` }],
            [{ text: '⬅️ Назад', callback_data: 'back' }],
        ],
    },
    review: {
        inline_keyboard: [
            [{ text: '⭐ Оставить отзыв', url: `${SITE_URL}/#review` }],
            [{ text: '⬅️ Назад', callback_data: 'back' }],
        ],
    },
    back: {
        inline_keyboard: [
            [{ text: '⬅️ Назад', callback_data: 'back' }],
        ],
    },
};

// ==================== WEBHOOK: POST ====================
export async function POST(req) {
    let update;
    try {
        update = await req.json();
    } catch {
        console.log('[TG] Bad JSON in webhook');
        return NextResponse.json({ ok: true });
    }

    console.log('[TG] === UPDATE ===', JSON.stringify(update));

    try {
        // --- СООБЩЕНИЯ ---
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = (update.message.text || '').trim();
            const firstName = update.message.from?.first_name || 'друг';

            console.log('[TG] Message from', chatId, ':', text);

            if (text.startsWith('/start')) {
                await sendMessage(
                    chatId,
                    `<b>${firstName}</b>, добро пожаловать! 🍓\n\n` +
                        TEXTS.welcome.split('\n\n').slice(1).join('\n\n'),
                    KB.main
                );
            } else if (text.startsWith('/menu')) {
                await sendMessage(chatId, TEXTS.menu, KB.menu);
            } else if (text.startsWith('/contacts')) {
                await sendMessage(chatId, TEXTS.contacts, KB.contacts);
            } else if (text.startsWith('/help')) {
                await sendMessage(chatId, TEXTS.help, KB.back);
            } else {
                await sendMessage(chatId, TEXTS.welcome, KB.main);
            }

            return NextResponse.json({ ok: true });
        }

        // --- КНОПКИ ---
        if (update.callback_query) {
            const cb = update.callback_query;
            const chatId = cb.message.chat.id;
            const messageId = cb.message.message_id;
            const data = cb.data;

            console.log('[TG] Callback:', data, 'from', chatId);
            await answerCallback(cb.id);

            if (data === 'menu') {
                await editMessage(chatId, messageId, TEXTS.menu, KB.menu);
            } else if (data === 'contacts') {
                await editMessage(chatId, messageId, TEXTS.contacts, KB.contacts);
            } else if (data === 'delivery') {
                await editMessage(chatId, messageId, TEXTS.delivery, KB.delivery);
            } else if (data === 'review') {
                await editMessage(chatId, messageId, TEXTS.review, KB.review);
            } else if (data === 'back') {
                await editMessage(chatId, messageId, TEXTS.welcome, KB.main);
            }

            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('[TG] Error:', e.message);
        return NextResponse.json({ ok: true });
    }
}

// ==================== WEBHOOK: GET (диагностика) ====================
export async function GET() {
    if (!TOKEN) {
        return NextResponse.json(
            {
                ok: false,
                error: 'TELEGRAM_BOT_TOKEN не задан в env',
                env: process.env.VERCEL_ENV || 'local',
            },
            { status: 500 }
        );
    }

    // Проверим, что токен рабочий — запросим инфо о боте
    try {
        const r = await fetch(`https://api.telegram.org/bot${TOKEN}/getMe`, {
            cache: 'no-store',
        });
        const data = await r.json();

        return NextResponse.json({
            ok: true,
            message: 'Webhook is alive',
            hasToken: true,
            tokenPrefix: TOKEN.slice(0, 10) + '...',
            botOk: data.ok,
            botUsername: data.result?.username || null,
            botName: data.result?.first_name || null,
            botError: data.ok ? null : data.description,
            env: process.env.VERCEL_ENV || 'local',
        });
    } catch (e) {
        return NextResponse.json(
            {
                ok: false,
                hasToken: true,
                fetchError: e.message,
            },
            { status: 500 }
        );
    }
}