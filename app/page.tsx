import Link from "next/link";

const services = [
  {
    emoji: "🎁",
    title: "Xonçalar",
    desc: "Hər zövqə uyğun, zərif və ləzzətli xonça kolleksiyaları",
  },
  {
    emoji: "🎂",
    title: "Ad günü",
    desc: "Xüsusi gününüzü unudulmaz edən şirin surprizlər",
  },
  {
    emoji: "💍",
    title: "Toy & Nişan",
    desc: "Ən gözəl anlarınız üçün incə və zərif şirniyyatlar",
  },
  {
    emoji: "✨",
    title: "Xüsusi sifariş",
    desc: "Öz ideyanızı bizə deyin — biz həyata keçirək",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-rose-400/10" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-400/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block rounded-full border border-rose-400/30 bg-white/60 px-4 py-1.5 text-sm font-medium text-rose-600 backdrop-blur-sm">
              Əl işi · Təzə · Xüsusi hazırlanmış
            </p>

            <h1 className="font-display text-5xl font-bold leading-tight text-chocolate-900 md:text-7xl">
              Aurea
            </h1>

            <p className="mt-6 font-display text-xl italic text-rose-600 md:text-2xl">
              Hər təbrikinizə şirin bir toxunuş
            </p>

            <p className="mt-8 text-lg leading-relaxed text-chocolate-700 md:text-xl">
              Ad günündən toy masasına qədər — hər xüsusi anınız üçün
              sevgi ilə hazırlanmış şirniyyatlar, xonçalar və şirin
              hədiyyələr. Dizaynı siz seçin, biz isə onu dadla birləşdirək.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/sifaris" className="btn-primary text-lg px-10 py-5">
                İndi başla
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            <p className="mt-8 text-sm text-chocolate-500">
              Dizayn · Forma · Tarix — hamısını bir neçə addımda seçin
            </p>
          </div>
        </div>
      </section>

      {/* Catchy phrases */}
      <section className="border-y border-cream-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Hər şirniyyatda bir sevgi hekayəsi",
                sub: "Təzə məhsullarla, incə əllərlə hazırlanır",
              },
              {
                quote: "Xüsusi gününüz — xüsusi dizayn",
                sub: "Sizin zövqünüz, bizim ustalığımız",
              },
              {
                quote: "Təbrik deyil, xatirə yaradın",
                sub: "Toy, nişan, ad günü və daha çoxu",
              },
            ].map((item) => (
              <div
                key={item.quote}
                className="rounded-2xl border border-cream-200 bg-cream-50 p-8 text-center transition-shadow hover:shadow-md"
              >
                <p className="font-display text-lg font-semibold text-chocolate-900">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm text-chocolate-600">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="xidmetler" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="section-heading">Nə təklif edirik?</h2>
            <p className="mt-4 text-chocolate-600">
              Hər bir tədbir üçün uyğun şirin həllər
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-cream-200 bg-white p-6 transition-all hover:border-rose-400/40 hover:shadow-lg"
              >
                <span className="text-4xl">{service.emoji}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-chocolate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-chocolate-600">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Creator */}
      <section id="haqqimizda" className="scroll-mt-24 bg-cream-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">Yaradıcı</h2>
            <div className="mt-8 rounded-3xl border border-cream-200 bg-white p-10 shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-3xl text-white shadow-lg">
                🍰
              </div>
              <p className="mt-6 font-display text-xl font-semibold text-chocolate-900">
                Aurea — sevgi ilə hazırlanır
              </p>
              <p className="mt-4 leading-relaxed text-chocolate-700">
                Hər bir xonça və şirniyyatımız sizin xüsusi anlarınız üçün
                fərdi olaraq hazırlanır. Biz inanırıq ki, ən yaxşı hədiyyə
                həm gözəl görünən, həm də dadlı olan hədiyyədir. Sizin
                arzularınızı dinləyir, dizaynınızı birlikdə seçirik və
                nəticədə ürəyinizdən keçən bir şirin əsər yaradırıq.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-rose-500 to-rose-600 px-8 py-16 text-center text-white shadow-xl shadow-rose-500/20">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Xüsusi gününüz yaxındadır?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              İndi dizaynınızı seçin — biz qalanını edək
            </p>
            <Link
              href="/sifaris"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-rose-600 shadow-lg transition-all hover:bg-cream-50 hover:-translate-y-0.5"
            >
              İndi başla
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
