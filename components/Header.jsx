import Link from "next/link";
import Brand from "./Brand";

export default function Header({ focus = false }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E3E8E5] bg-[#F6F8F7]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/">
          <Brand />
        </Link>
        {!focus && (
          <nav className="hidden items-center gap-6 text-sm text-[#3a352e] lg:flex">
            <Link href="/layanan?s=pln" className="hover:text-[#1c1a17]">PLN</Link>
            <Link href="/layanan?s=pulsa" className="hover:text-[#1c1a17]">Pulsa</Link>
            <Link href="/layanan?s=bpjs" className="hover:text-[#1c1a17]">BPJS</Link>
            <Link href="/layanan?s=pdam" className="hover:text-[#1c1a17]">PDAM</Link>
            <Link href="/#promo" className="hover:text-[#1c1a17]">Flash Sale</Link>
            <Link href="/#cara" className="hover:text-[#1c1a17]">Cara Order</Link>
            <Link href="/#faq" className="hover:text-[#1c1a17]">FAQ</Link>
          </nav>
        )}
        <Link href="/#layanan" className="btn !py-2 text-sm">Bayar</Link>
      </div>
    </header>
  );
}
