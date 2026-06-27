import type { OrderRecord } from "@/lib/orders";
import { formatOrderDate, formatRequiredDate } from "@/lib/orders";

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram konfiqurasiyası tam deyil.");
  }

  return { botToken, chatId };
}

export function buildTelegramMessage(order: OrderRecord): string {
  const lines = [
    "🍰 Yeni sifariş!",
    "",
    `👤 Ad: ${order.name}`,
    `📞 Telefon: ${order.phone}`,
    `🎉 Hadisə: ${order.occasionLabel}`,
    `🎨 Dizayn: ${order.designLabel}`,
    `📦 Ölçü: ${order.quantity} ədəd`,
    `📅 Lazım olan tarix: ${formatRequiredDate(order.date)}`,
    `⚡ Təcili: ${order.isUrgent ? "Bəli (+30%)" : "Xeyr"}`,
    `✏️ Mətn: ${order.wantsText ? order.customText || "" : "Yox"}`,
    `💰 Cəmi: ${order.total.toFixed(2)} ₼`,
    "💳 Ödəniş: Çatdırılma zamanı",
  ];

  if (order.note) {
    lines.push(`📝 Qeyd: ${order.note}`);
  }

  lines.push("", `🕒 Sifariş vaxtı: ${formatOrderDate(order.createdAt)}`);

  return lines.join("\n");
}

export async function sendTelegramOrder(order: OrderRecord): Promise<void> {
  const { botToken, chatId } = getTelegramConfig();
  const text = buildTelegramMessage(order);

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram xətası: ${errorText}`);
  }
}
