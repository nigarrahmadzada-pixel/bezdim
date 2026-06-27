import Link from "next/link";

type PaymentSummary = {
  paidAmount: number;
  remainingAmount: number;
  total: number;
};

type OrderSuccessProps = {
  paymentSummary?: PaymentSummary | null;
};

export default function OrderSuccess({ paymentSummary }: OrderSuccessProps) {
  const isOnline = Boolean(paymentSummary);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-16 text-center">
      <div className="w-full rounded-3xl border border-cream-200 bg-white p-10 shadow-sm">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{ backgroundColor: "#FDF2F4" }}
        >
          ✅
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold text-chocolate-900">
          {isOnline
            ? "Ödəniş və sifariş uğurla tamamlandı!"
            : "Sifarişiniz uğurla qeydə alındı!"}
        </h1>

        <p className="mt-4 leading-relaxed text-chocolate-600">
          {isOnline
            ? "İlkin ödənişiniz alındı və sifarişiniz bizə çatdı. Tezliklə sizinlə əlaqə saxlayacağıq."
            : "Təşəkkür edirik! Sifarişiniz bizə çatdı. Tezliklə sizinlə əlaqə saxlayacağıq və bütün detalları birlikdə müzakirə edəcəyik."}
        </p>

        {paymentSummary && (
          <div className="mt-5 rounded-xl bg-cream-100 px-4 py-3 text-sm text-chocolate-700">
            <p>
              Ödənilib:{" "}
              <strong>{paymentSummary.paidAmount.toFixed(2)} ₼</strong>
            </p>
            <p className="mt-1">
              Qalan (çatdırılma zamanı):{" "}
              <strong>{paymentSummary.remainingAmount.toFixed(2)} ₼</strong>
            </p>
            <p className="mt-1 text-chocolate-500">
              Cəmi: {paymentSummary.total.toFixed(2)} ₼
            </p>
          </div>
        )}

        <p className="mt-3 text-sm text-chocolate-500">
          Zəhmət olmasa telefonunuzu yaxınınızda saxlayın.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl py-4 text-base font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#722F37" }}
        >
          Ana səhifəyə qayıt
        </Link>

        <Link
          href="/sifaris"
          className="mt-3 inline-block text-sm text-chocolate-500 transition-colors hover:text-[#722F37]"
        >
          Yeni sifariş ver
        </Link>
      </div>
    </div>
  );
}
