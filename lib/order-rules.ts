import { calculatePrice } from "@/lib/pricing";

export const STANDARD_LEAD_DAYS = 3;
export const URGENT_SURCHARGE_RATE = 0.3;
export const TEXT_EXTRA = 2;

const TIMEZONE = "Asia/Baku";

function parseParts(dateStr: string): { y: number; m: number; d: number } {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { y, m, d };
}

export function getTodayInBaku(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(
    new Date()
  );
}

export function addDaysToDateString(dateStr: string, days: number): string {
  const { y, m, d } = parseParts(dateStr);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

export function daysBetween(fromDate: string, toDate: string): number {
  const from = parseParts(fromDate);
  const to = parseParts(toDate);
  const fromMs = Date.UTC(from.y, from.m - 1, from.d);
  const toMs = Date.UTC(to.y, to.m - 1, to.d);
  return Math.round((toMs - fromMs) / 86_400_000);
}

export function getMinDeliveryDate(isUrgent: boolean): string {
  const today = getTodayInBaku();
  return addDaysToDateString(today, isUrgent ? 1 : STANDARD_LEAD_DAYS);
}

export function getMaxDeliveryDate(isUrgent: boolean): string | undefined {
  if (!isUrgent) return undefined;
  const today = getTodayInBaku();
  return addDaysToDateString(today, STANDARD_LEAD_DAYS - 1);
}

export function validateOrderDate(
  date: string,
  isUrgent: boolean
): { ok: true } | { ok: false; error: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "Tarix düzgün deyil." };
  }

  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return { ok: false, error: "Tarix düzgün deyil." };
  }

  const today = getTodayInBaku();
  const leadDays = daysBetween(today, date);

  if (leadDays < 1) {
    return {
      ok: false,
      error: "Bu gün və ya keçmiş tarix üçün sifariş qəbul olunmur.",
    };
  }

  if (isUrgent) {
    if (leadDays >= STANDARD_LEAD_DAYS) {
      return {
        ok: false,
        error:
          "Təcili sifariş yalnız 3 gündən tez tarixlər üçündür. Standart sifariş seçin.",
      };
    }
    return { ok: true };
  }

  if (leadDays < STANDARD_LEAD_DAYS) {
    return {
      ok: false,
      error: `Standart sifariş minimum ${STANDARD_LEAD_DAYS} gün əvvəlcədən verilməlidir. Təcili sifariş (+30%) seçin.`,
    };
  }

  return { ok: true };
}

export function calculateOrderPricing(
  quantity: number,
  wantsText: boolean,
  isUrgent: boolean
) {
  const basePrice = calculatePrice(quantity);
  const textExtra = wantsText ? TEXT_EXTRA : 0;
  const subtotal = Math.round((basePrice + textExtra) * 100) / 100;
  const urgentExtra = isUrgent
    ? Math.round(subtotal * URGENT_SURCHARGE_RATE * 100) / 100
    : 0;
  const total = Math.round((subtotal + urgentExtra) * 100) / 100;

  return {
    basePrice,
    textExtra,
    subtotal,
    urgentExtra,
    total,
  };
}

export function formatDateLabel(dateStr: string): string {
  const { d, m, y } = parseParts(dateStr);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}
