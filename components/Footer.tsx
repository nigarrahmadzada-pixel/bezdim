export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-display text-lg font-semibold text-chocolate-900">
            Aurea
          </p>
          <p className="text-sm text-chocolate-600">
            © {new Date().getFullYear()} Aurea. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}
