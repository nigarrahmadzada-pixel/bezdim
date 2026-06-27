"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  STANDARD_LEAD_DAYS,
  TEXT_EXTRA,
  URGENT_SURCHARGE_RATE,
  calculateOrderPricing,
  formatDateLabel,
  getMaxDeliveryDate,
  getMinDeliveryDate,
  validateOrderDate,
} from "@/lib/order-rules";

const occasions = [
  { id: "toy", label: "Toy" },
  { id: "nisan", label: "Nişan" },
  { id: "xina", label: "Xına gecəsi" },
  { id: "ad-gunu", label: "Ad günü" },
  { id: "diger", label: "Digər" },
];

const designs = [
  {
    id: "klassik-ag",
    label: "Klassik ağ",
    desc: "Şəffaf qutu, incə bant",
    image: "/designs/klassik-ag.svg",
  },
  {
    id: "cicekli-cehrayi",
    label: "Çiçəkli çəhrayı",
    desc: "Çiçək motivli, romantik",
    image: "/designs/cicekli-cehrayi.svg",
  },
  {
    id: "qizil-lux",
    label: "Qızıl lüks",
    desc: "Premium qızıl detallar",
    image: "/designs/qizil-lux.svg",
  },
  {
    id: "pastel-romantik",
    label: "Pastel romantik",
    desc: "Yumşaq pastel tonlar",
    image: "/designs/pastel-romantik.svg",
  },
  {
    id: "minimal-modern",
    label: "Minimal modern",
    desc: "Sadə və zərif xətlər",
    image: "/designs/minimal-modern.svg",
  },
  {
    id: "toy-nisan",
    label: "Toy & nişan",
    desc: "Xüsusi gün üçün dizayn",
    image: "/designs/toy-nisan.svg",
  },
  {
    id: "tabii-bej",
    label: "Təbii bej xonça",
    desc: "Təbii tonlarda xonça",
    image: "/designs/tabii-bej.svg",
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SifarisForm() {
  const router = useRouter();
  const [occasion, setOccasion] = useState("");
  const [design, setDesign] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [wantsText, setWantsText] = useState(false);
  const [customText, setCustomText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const qty = parseInt(quantity, 10);
  const isValidQty = !isNaN(qty) && qty > 0;

  const pricing = useMemo(() => {
    if (!isValidQty) return null;
    return calculateOrderPricing(qty, wantsText, isUrgent);
  }, [qty, wantsText, isUrgent, isValidQty]);

  const minDate = getMinDeliveryDate(isUrgent);
  const maxDate = getMaxDeliveryDate(isUrgent);

  const dateValidation = useMemo(() => {
    if (!date) return null;
    return validateOrderDate(date, isUrgent);
  }, [date, isUrgent]);

  const isValidPhone = phone.length >= 9 && phone.length <= 12;

  const canSubmit =
    occasion !== "" &&
    design !== "" &&
    isValidQty &&
    date !== "" &&
    dateValidation?.ok === true &&
    name.trim() !== "" &&
    isValidPhone &&
    (!wantsText || customText.trim() !== "");

  function handleQuantityChange(value: string) {
    if (value === "" || /^\d+$/.test(value)) {
      setQuantity(value);
    }
  }

  function handlePhoneChange(value: string) {
    setPhone(value.replace(/\D/g, ""));
  }

  function handleUrgentChange(checked: boolean) {
    setIsUrgent(checked);
    if (date && !validateOrderDate(date, checked).ok) {
      setDate("");
    }
  }

  function buildPayload() {
    return {
      occasion,
      design,
      quantity: qty,
      date,
      isUrgent,
      wantsText,
      customText: wantsText ? customText.trim() : "",
      name: name.trim(),
      phone,
      note: note.trim(),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    const payload = buildPayload();

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok && !data.ok) {
        throw new Error(data.error || "Sifariş göndərilərkən xəta baş verdi.");
      }

      router.push("/sifaris/ugrurlu");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Sifariş göndərilərkən xəta baş verdi."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-cream-200 bg-white px-4 py-3 text-chocolate-800 outline-none transition-colors focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/15";

  return (
    <div className="mx-auto max-w-lg px-5 py-8 pb-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-chocolate-600 hover:text-[#722F37] transition-colors"
      >
        ← Geri
      </Link>

      <h1 className="mt-6 text-center font-display text-3xl font-semibold text-chocolate-900">
        Sifarişini hazırla
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-chocolate-800">
            Hadisə növü
          </legend>
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOccasion(o.id)}
                className={`pill-btn ${
                  occasion === o.id ? "pill-btn-selected" : "pill-btn-default"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-medium text-chocolate-800">
            Dizayn seçin
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {designs.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDesign(d.id)}
                className={`design-image-card ${
                  design === d.id
                    ? "design-image-card-selected"
                    : "design-image-card-default"
                }`}
              >
                {design === d.id && (
                  <span
                    className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: "#722F37" }}
                  >
                    <CheckIcon />
                  </span>
                )}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-50">
                  <Image
                    src={d.image}
                    alt={d.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 512px) 50vw, 240px"
                  />
                </div>
                <div className="p-3">
                  <span className="block text-sm font-semibold text-chocolate-900">
                    {d.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-chocolate-500">
                    {d.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="quantity"
            className="mb-3 block text-sm font-medium text-chocolate-800"
          >
            Ölçü (ədəd)
          </label>
          <div className="flex items-center gap-3">
            <input
              id="quantity"
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              placeholder="Məs: 15"
              className={`${inputClass} flex-1`}
            />
            <div
              className="flex min-w-[7rem] items-center justify-center rounded-xl px-4 py-3 text-center"
              style={{
                backgroundColor: isValidQty ? "#FDF2F4" : "#FFF5EB",
                border: `1px solid ${isValidQty ? "#722F37" : "#FFE8D6"}`,
              }}
            >
              <span
                className="font-display text-lg font-bold"
                style={{ color: isValidQty ? "#722F37" : "#9CA3AF" }}
              >
                {pricing ? `${pricing.basePrice.toFixed(2)} ₼` : "— ₼"}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-chocolate-500">
            Qiymət ədəd sayına görə avtomatik hesablanır
          </p>
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-chocolate-800"
          >
            Lazım olan tarix
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            max={maxDate}
            required
            className={inputClass}
          />
          <p className="mt-2 text-xs text-chocolate-500">
            {isUrgent
              ? `Təcili sifariş: ${formatDateLabel(minDate)} – ${maxDate ? formatDateLabel(maxDate) : ""} arası (+${URGENT_SURCHARGE_RATE * 100}%)`
              : `Standart sifariş minimum ${STANDARD_LEAD_DAYS} gün əvvəlcədən — ən tez ${formatDateLabel(minDate)}`}
          </p>
          {date && dateValidation && !dateValidation.ok && (
            <p className="mt-1 text-xs text-red-600">{dateValidation.error}</p>
          )}
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => handleUrgentChange(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-amber-300 accent-[#722F37]"
            />
            <span>
              <span className="block text-sm font-semibold text-chocolate-900">
                ⚡ Təcili sifariş (+{URGENT_SURCHARGE_RATE * 100}%)
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-chocolate-600">
                Sabah və ya 3 gündən tez lazımdırsa, bu seçimi aktiv edin.
                Standart {STANDARD_LEAD_DAYS} gün gözləmə tələbi tətbiq olunmur.
              </span>
            </span>
          </label>
        </div>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={wantsText}
              onChange={(e) => {
                setWantsText(e.target.checked);
                if (!e.target.checked) setCustomText("");
              }}
              className="mt-0.5 h-4 w-4 rounded border-cream-200 accent-[#722F37]"
            />
            <span className="text-sm text-chocolate-700">
              Üzərində mətn istəyirəm{" "}
              <span className="text-chocolate-500">(+{TEXT_EXTRA} ₼)</span>
            </span>
          </label>

          {wantsText && (
            <div className="pl-7">
              <label
                htmlFor="customText"
                className="mb-2 block text-sm font-medium text-chocolate-800"
              >
                Nə yazılsın?
              </label>
              <input
                id="customText"
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Məs: Ad Günün Mübarək, Sevinc & Kamran"
                required
                className={inputClass}
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-chocolate-800"
          >
            Ad, Soyad
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-chocolate-800"
          >
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="0123456789"
            maxLength={12}
            required
            className={inputClass}
          />
          {phone.length > 0 && !isValidPhone && (
            <p className="mt-1 text-xs text-red-600">
              Telefon nömrəsi 9–12 rəqəm olmalıdır
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="note"
            className="mb-2 block text-sm font-medium text-chocolate-800"
          >
            Qeyd (istəyə bağlı)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {pricing && (
          <div className="space-y-2 rounded-xl bg-cream-100 px-5 py-4 text-sm text-chocolate-700">
            {wantsText && (
              <div className="flex justify-between">
                <span>Mətn</span>
                <span>+{pricing.textExtra.toFixed(2)} ₼</span>
              </div>
            )}
            {isUrgent && (
              <div className="flex justify-between">
                <span>Təcili (+{URGENT_SURCHARGE_RATE * 100}%)</span>
                <span>+{pricing.urgentExtra.toFixed(2)} ₼</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-cream-200 pt-2">
              <span className="font-medium text-chocolate-600">Cəmi</span>
              <span
                className="font-display text-2xl font-bold"
                style={{ color: "#722F37" }}
              >
                {pricing.total.toFixed(2)} ₼
              </span>
            </div>
          </div>
        )}

        {submitError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="flex w-full items-center justify-center rounded-xl py-4 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            backgroundColor: canSubmit && !submitting ? "#722F37" : "#C4A882",
          }}
        >
          {submitting ? "Göndərilir..." : "Sifarişi təsdiqlə"}
        </button>
      </form>
    </div>
  );
}

export default function SifarisPage() {
  return <SifarisForm />;
}
