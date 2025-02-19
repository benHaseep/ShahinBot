const { Telegraf } = require('telegraf');
// require('dotenv').config(); // لتحميل المتغيرات البيئية من ملف .env

// استبدل 'YOUR_BOT_TOKEN' بالرمز الذي حصلت عليه من BotFather
const bot = new Telegraf(process.env.BOT_TOKEN);

// استبدل 'YOUR_USER_ID' بمعرف المستخدم الخاص بك
const ownerId = process.env.OWNER_ID;

// أمر البدء
bot.start((ctx) => {
    ctx.reply('السلام عليكم! أرسل رسالتك الآن حتي أرسلها إلي شاهين');
});

// التعامل مع الرسائل الواردة
bot.on('message', async (ctx) => {
    try {
        if (ctx.message.text || ctx.message.photo || ctx.message.video || ctx.message.sticker) {
            // إرسال الرسالة إلى المالك
            await ctx.forwardMessage(ownerId);

            // تأخير الرد لمدة ثانيتين (2000 مللي ثانية)
            setTimeout(() => {
                ctx.reply('أرسلتها له، سيراها حينما ينشط.');
            }, 2000); // يمكنك تغيير المدة حسب ما تراه مناسبًا
        } else {
            ctx.reply('من فضلك أرسل رسالة نصية أو وسائط مدعومة.');
        }
    } catch (error) {
        console.error('حدث خطأ أثناء إرسال الرسالة:', error);
        ctx.reply('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.');
    }
});
// تشغيل البوت
bot.launch()
    .then(() => {
        console.log('Bot is running...');
    })
    .catch((err) => {
        console.error('حدث خطأ أثناء تشغيل البوت:', err);
    });

// تمكين إيقاف البوت بشكل أنيق
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));