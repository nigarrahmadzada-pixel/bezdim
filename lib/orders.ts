import {
  calculateOrderPricing,
  validateOrderDate,
} from "@/lib/order-rules";

export const OCCASION_LABELS: Record<string, string> = {
  toy: "Toy",
  nisan: "Nişan",
  xina: "Xına gecəsi",
  "ad-gunu": "Ad günü",
  diger: "Digər",
};

export const DESIGN_LABELS: Record<string, string> = {
  "klassik-ag": "Klassik ağ",
  "cicekli-cehrayi": "Çiçəkli çəhrayı",
  "qizil-lux": "Qızıl lüks",
  "pastel-romantik": "Pastel romantik",
  "minimal-modern": "Minimal modern",
  "toy-nisan": "Toy & nişan",
  "tabii-bej": "Təbii bej xonça",
};

export type OrderInput = {
  occasion: string;
  design: string;
  quantity: number;
  date: string;
  wantsText: boolean;
  customText?: string;
  name: string;
  phone: string;
  note?: string;
  isUrgent: boolean;
};

export type OrderRecord = OrderInput & {
  occasionLabel: string;
  designLabel: string;
  basePrice: number;
  textExtra: number;
  subtotal: number;
  urgentExtra: number;
  total: number;
  createdAt: string;
};

export function parseOrderInput(body: unknown):
  | { ok: true; order: OrderRecord }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Yanlış məlumat formatı." };
  }

  const data = body as Record<string, unknown>;

  const occasion = String(data.occasion ?? "").trim();
  const design = String(data.design ?? "").trim();
  const quantity = Number(data.quantity);
  const date = String(data.date ?? "").trim();
  const wantsText = Boolean(data.wantsText);
  const customText = String(data.customText ?? "").trim();
  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").replace(/\D/g, "");
  const note = String(data.note ?? "").trim();
  const isUrgent = Boolean(data.isUrgent);

  if (!OCCASION_LABELS[occasion]) {
    return { ok: false, error: "Hadisə növü seçilməyib." };
  }

  if (!DESIGN_LABELS[design]) {
    return { ok: false, error: "Dizayn seçilməyib." };
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { ok: false, error: "Ölçü düzgün deyil." };
  }

  const dateValidation = validateOrderDate(date, isUrgent);
  if (!dateValidation.ok) {
    return { ok: false, error: dateValidation.error };
  }

  if (!name) {
    return { ok: false, error: "Ad, soyad daxil edilməyib." };
  }

  if (phone.length < 9 || phone.length > 12) {
    return { ok: false, error: "Telefon nömrəsi 9–12 rəqəm olmalıdır." };
  }

  if (wantsText && !customText) {
    return { ok: false, error: "Mətn sahəsi boş ola bilməz." };
  }

  const pricing = calculateOrderPricing(quantity, wantsText, isUrgent);

  return {
    ok: true,
    order: {
      occasion,
      design,
      quantity,
      date,
      wantsText,
      customText: wantsText ? customText : "",
      name,
      phone,
      note,
      isUrgent,
      occasionLabel: OCCASION_LABELS[occasion],
      designLabel: DESIGN_LABELS[design],
      basePrice: pricing.basePrice,
      textExtra: pricing.textExtra,
      subtotal: pricing.subtotal,
      urgentExtra: pricing.urgentExtra,
      total: pricing.total,
      createdAt: new Date().toISOString(),
    },
  };
}

export function formatOrderDate(isoDate: string): string {
  return new Intl.DateTimeFormat("az-AZ", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

export function formatRequiredDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

export function serializeOrder(order: OrderRecord): string {
  return JSON.stringify(order);
}

export function deserializeOrder(value: string): OrderRecord | null {
  try {
    const parsed = JSON.parse(value) as OrderRecord;
    if (!parsed.name || !parsed.phone || !parsed.date) return null;
    return parsed;
  } catch {
    return null;
  }
}
