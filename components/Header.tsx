"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

const navLinks = [
  { href: "/#haqqimizda", label: "Haqqımızda", sectionId: "haqqimizda" },
  { href: "/#xidmetler", label: "Xidmətlər", sectionId: "xidmetler" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleSectionNav(sectionId: string) {
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);

    const doScroll = () => {
      if (pathname === "/") {
        scrollToSection(sectionId);
        window.history.replaceState(null, "", `#${sectionId}`);
        return;
      }

      router.push(`/#${sectionId}`);
    };

    if (wasMenuOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(doScroll);
      });
      return;
    }

    doScroll();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200/80 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-lg text-white shadow-md">
            A
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-chocolate-900 transition-colors group-hover:text-rose-600">
            Aurea
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-chocolate-700 sm:flex">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              onClick={() => handleSectionNav(link.sectionId)}
              className="hover:text-rose-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/sifaris"
            className="rounded-full bg-chocolate-800 px-5 py-2.5 text-white hover:bg-chocolate-900 transition-colors"
          >
            Sifariş ver
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-chocolate-800 transition-colors hover:bg-cream-200/80 sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-cream-200/80 bg-cream-50/95 px-4 py-3 sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.sectionId}>
                <button
                  type="button"
                  onClick={() => handleSectionNav(link.sectionId)}
                  className="w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-chocolate-700 transition-colors hover:bg-cream-200/70 hover:text-rose-600"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link
                href="/sifaris"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex w-full items-center justify-center rounded-full bg-chocolate-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-chocolate-900"
              >
                Sifariş ver
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
