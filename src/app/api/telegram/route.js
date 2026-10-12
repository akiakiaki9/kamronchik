import { NextResponse } from 'next/server';
import {
    sendMessage,
    editMessageText,
    answerCallbackQuery,
    TEXTS,
    KEYBOARDS,
} from '@/lib/telegram';

// Разрешаем только Telegram
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

export async function POST(req) {
    // 🔒 Проверяем секретный заголовок от Telegram
    if (SECRET) {
        const header = req.headers.get('x-telegram-bot-api-secret-token');
        if (header !== SECRET) {
            console.warn('Invalid webhook secret');
            return NextResponse.json({ ok: false }, { status: 403 });
        }
    }

    let update;
    try {
        update = await req.json();
    } catch {
        return NextResponse.json({ ok: true });
    }

    try {
        // ============ СООБЩЕНИЯ ============
        if (update.message) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = (msg.text || '').trim();
            const firstName = msg.from?.first_name || 'друг';

            // /start
            if (text.startsWith('/start')) {
                const greeting = text.replace('/start', '').trim();
                const prefix = greeting
                    ? `<b>${firstName}</b>, добро пожаловать! 🍓\n\n`
                    : `<b>${firstName}</b>, добро пожаловать! 🍓\n\n`;

                await sendMessage(chatId, prefix + TEXTS.welcome.split('\n\n').slice(1).join('\n\n'), {
                    reply_markup: KEYBOARDS.main,
                });
                return NextResponse.json({ ok: true });
            }

            // /menu
            if (text.startsWith('/menu')) {
                await sendMessage(chatId, TEXTS.menu, {
                    reply_markup: KEYBOARDS.menu,
                });
                return NextResponse.json({ ok: true });
            }

            // /contacts
            if (text.startsWith('/contacts')) {
                await sendMessage(chatId, TEXTS.contacts, {
                    reply_markup: KEYBOARDS.contacts,
                });
                return NextResponse.json({ ok: true });
            }

            // /help
            if (text.startsWith('/help')) {
                await sendMessage(chatId, TEXTS.help, {
                    reply_markup: KEYBOARDS.back,
                });
                return NextResponse.json({ ok: true });
            }

            // Любой другой текст — приветствие с меню
            await sendMessage(chatId, TEXTS.welcome, {
                reply_markup: KEYBOARDS.main,
            });
            return NextResponse.json({ ok: true });
        }

        // ============ НАЖАТИЯ НА КНОПКИ ============
        if (update.callback_query) {
            const cb = update.callback_query;
            const chatId = cb.message.chat.id;
            const messageId = cb.message.message_id;
            const data = cb.data;

            // Убираем «часики» на кнопке
            await answerCallbackQuery(cb.id);

            switch (data) {
                case 'menu':
                    await editMessageText(chatId, messageId, TEXTS.menu, {
                        reply_markup: KEYBOARDS.menu,
                    });
                    break;

                case 'contacts':
                    await editMessageText(chatId, messageId, TEXTS.contacts, {
                        reply_markup: KEYBOARDS.contacts,
                    });
                    break;

                case 'delivery':
                    await editMessageText(chatId, messageId, TEXTS.delivery, {
                        reply_markup: KEYBOARDS.delivery,
                    });
                    break;

                case 'review':
                    await editMessageText(chatId, messageId, TEXTS.review, {
                        reply_markup: KEYBOARDS.review,
                    });
                    break;

                case 'back_main':
                    await editMessageText(chatId, messageId, TEXTS.welcome, {
                        reply_markup: KEYBOARDS.main,
                    });
                    break;

                default:
                    break;
            }

            return NextResponse.json({ ok: true });
        }

        // Другие типы апдейтов (фото, стикеры и т.д.) — игнорируем
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error('Telegram webhook error:', e);
        // Всегда возвращаем 200, иначе Telegram будет ретраить
        return NextResponse.json({ ok: true });
    }
}

// GET — для быстрой проверки, что роут живой
export async function GET() {
    return NextResponse.json({
        ok: true,
        message: 'Telegram webhook is alive',
        timestamp: new Date().toISOString(),
    });
}