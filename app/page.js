"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Brand from "@/components/Brand";
import { ServiceIcon } from "@/components/Icon";
import { CATEGORIES, SERVICES } from "@/lib/data";

const QT = {
  pln: ["PLN", "Nomor meter / ID pelanggan", ["20rb", "50rb", "100rb"]],
  pulsa: ["Pulsa", "Nomor HP (08xx)", ["10rb", "25rb", "50rb"]],
  data: ["Data", "Nomor HP (08xx)", ["8GB", "15GB", "25GB"]],
  wallet: ["E-Wallet", "Nomor HP terdaftar", ["50rb", "100rb", "200rb"]],
};

const MARQUEE = [
  "Token PLN",
  "Pulsa",
  "Paket Data",
  "BPJS Kesehatan",
  "PDAM",
  "Internet & TV",
  "E-Wallet",
  "Multifinance",
  "Voucher Game",
  "Telkom",
];

const FAQS = [
  ["Berapa lama proses transaksi?", "Rata-rata 3 detik setelah pembayaran terkonfirmasi."],
  ["Metode pembayaran apa saja?", "QRIS, DANA, OVO, GoPay, ShopeePay, serta virtual account BCA, BRI, Mandiri, dan BNI."],
  ["Bagaimana jika transaksi gagal?", "Dana dikembalikan otomatis ke saldo atau rekeningmu dalam 1x24 jam."],
  ["Apakah struk dikirim?", "Ya, struk dikirim ke nomor WhatsApp yang kamu isi saat pembayaran."],
];

const PAY_METHODS = [
  ["DANA", "248e11b4-2849-42fa-8a09-e1987efe9d3e.png"],
  ["OVO", "76a7673a-17f6-44a2-9dda-0b4be3773802.png"],
  ["GoPay", "f8592401-3679-40de-94ab-a4960b857771.png"],
  ["ShopeePay", "3723daad-da44-4ae3-80b1-b3463f295f7b.png"],
  ["BCA", "87bd109a-477d-4206-a291-c7004c8ce140.png"],
  ["BRI", "e64f3228-a8f8-4dcc-a383-02f975faffc2.png"],
  ["Mandiri", "fc0a3037-cbd3-48c6-b50f-e3ee84660114.png"],
];

export default function HomePage() {
  const [qk, setQk] = useState("pln");
  const [qs, setQs] = useState(1);
  const [qn, setQn] = useState("");
  const [cnt, setCnt] = useState(12480);
  const [cd, setCd] = useState(["05", "23", "00"]);
  const [cat, setCat] = useState("Semua");
  const [q, setQ] = useState("");
  const [inv, setInv] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setCnt((c) => c + 1 + ((Math.random() * 3) | 0));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const end = Date.now() + 5 * 3600e3 + 23 * 60e3;
    const tick = () => {
      const s = Math.max(0, ((end - Date.now()) / 1000) | 0);
      const v = [(s / 3600) | 0, ((s % 3600) / 60) | 0, s % 60];
      setCd(v.map((x) => String(x).padStart(2, "0")));
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const filtered = SERVICES.filter(
    (l) => (cat === "Semua" || l[2] === cat) && l[1].toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-12 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
          <div>
            <p className="mb-4 text-sm font-semibold text-[#12A150]">PPOB &amp; Produk Digital 24 Jam</p>
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Semua tagihan, beres dalam <span className="text-[#12A150]">satu tempat.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[#6b6358]">
              Token PLN, pulsa, paket data, BPJS, PDAM sampai e-wallet. Proses otomatis, struk langsung ke WhatsApp.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#layanan" className="btn">Bayar Tagihan →</a>
              <a href="#cek" className="btn2">Cek Pesanan</a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              <div className="card p-4">
                <div className="fh text-2xl font-bold">2jt+</div>
                <div className="text-xs text-[#6b6358]">Transaksi</div>
              </div>
              <div className="card p-4">
                <div className="fh text-2xl font-bold">3 dtk</div>
                <div className="text-xs text-[#6b6358]">Proses</div>
              </div>
              <div className="card p-4">
                <div className="fh text-2xl font-bold">4.9★</div>
                <div className="text-xs text-[#6b6358]">Rating</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[22px] border border-[#E3E8E5] bg-white p-5 shadow-[0_12px_40px_-20px_rgba(60,40,10,.25)] sm:p-6">
              <div className="relative flex items-center justify-between">
                <h3 className="font-bold">Bayar cepat</h3>
                <span className="flex items-center gap-2 rounded-full bg-green-500/10 px-2.5 py-1 text-xs text-green-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>Sistem online
                </span>
              </div>
              <div id="qt" className="relative mt-4 grid grid-cols-4 gap-1 rounded-xl bg-[#F6F8F7] p-1">
                {Object.entries(QT).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setQk(k);
                      setQs(1);
                    }}
                    className={`rounded-lg py-2 text-xs font-semibold transition sm:text-sm ${
                      k === qk ? "text-white" : "text-[#6b6358] hover:text-[#1c1a17]"
                    }`}
                  >
                    {v[0]}
                  </button>
                ))}
              </div>
              <div className="relative mt-4 flex items-center gap-3">
                <ServiceIcon name={qk} className="h-14 w-14 shrink-0" />
                <input
                  value={qn}
                  onChange={(e) => setQn(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  className="inp"
                  placeholder={QT[qk][1]}
                />
              </div>
              <div id="qc" className="relative mt-3 grid grid-cols-3 gap-2">
                {QT[qk][2].map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setQs(i)}
                    className={`rounded-xl border py-2.5 text-sm font-semibold transition ${
                      i === qs
                        ? "border-[#12A150] bg-[#12A150]/10 text-[#1c1a17]"
                        : "border-[#E3E8E5] text-[#3a352e] hover:border-[#12A150]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <a id="qg" href={`/layanan?s=${qk}`} className="btn relative mt-4 w-full !bg-[#0E8A44]">
                Lanjutkan →
              </a>
              <div className="relative mt-4 flex items-center gap-3 border-t border-[#E3E8E5] pt-4 text-xs text-[#6b6358]">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-[#FFFFFF] bg-[#12A150]"></span>
                  <span className="h-7 w-7 rounded-full border-2 border-[#FFFFFF] bg-[#ffb347]"></span>
                  <span className="h-7 w-7 rounded-full border-2 border-[#FFFFFF] bg-[#7a3b00]"></span>
                </div>
                <span>
                  <b id="qcnt" className="text-[#1c1a17]">{cnt.toLocaleString("id-ID")}</b> transaksi sukses hari ini
                </span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[18px] bg-[#FFD23F] p-5 text-[#1c1a17]">
                <div className="text-sm opacity-90">Cashback</div>
                <div className="fh text-4xl font-extrabold">5%</div>
                <div className="text-sm opacity-90">untuk transaksi pertama via QRIS</div>
              </div>
              <div className="card p-5">
                <div className="mb-3 text-sm text-[#6b6358]">Metode pembayaran</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="oplogo pm-QRIS !w-[72px]"></span>
                  {PAY_METHODS.map(([name, file]) => (
                    <img
                      key={name}
                      src={`/images/${file}`}
                      alt={name}
                      className="oplogo object-contain !w-[72px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-[#E3E8E5] bg-[#FFFFFF] py-4">
        <div className="marq fh text-lg font-semibold text-[#3a352e]">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              {s}
              <span className="text-[#12A150]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* PROMO */}
      <section id="promo" className="mx-auto max-w-7xl px-4 pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-[#12A150]/40 bg-[#FFFFFF] p-6 sm:p-10">
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#12A150]">⚡ Flash Sale</p>
              <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">Diskon pulsa &amp; data hingga 20%</h2>
              <p className="mt-2 text-[#6b6358]">Kuota terbatas, berakhir dalam:</p>
            </div>
            <div className="flex gap-3" id="cd">
              {cd.map((x, i) => (
                <div key={i} className="card w-20 py-3 text-center sm:w-24">
                  <div className="fh text-3xl font-extrabold text-[#12A150]">{x}</div>
                  <div className="text-xs text-[#6b6358]">{["Jam", "Menit", "Detik"][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="mx-auto max-w-7xl px-4 pt-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold">Pilih layanan</h2>
            <p className="mt-1 text-[#6b6358]">8 kategori untuk kebutuhan harianmu.</p>
          </div>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} className="inp md:max-w-xs" placeholder="Cari layanan…" />
        </div>
        <div id="flt" className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} className={`chip ${c === cat ? "on" : ""}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div id="grid" className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {filtered.map((l) => (
            <a key={l[0]} href={l[3]} className="card hov group flex flex-col items-center p-4 text-center sm:p-6">
              <ServiceIcon name={l[0]} className="w-20 sm:w-28 transition group-hover:scale-110" />
              <div className="mt-2 font-bold">{l[1]}</div>
              <div className="text-xs text-[#6b6358]">{l[2]}</div>
              {l[3] === "#" ? <span className="mt-2 text-[10px] text-[#8f877b]">Segera hadir</span> : null}
            </a>
          ))}
          {filtered.length === 0 ? <p className="col-span-full text-[#6b6358]">Layanan tidak ditemukan.</p> : null}
        </div>
      </section>

      {/* CARA */}
      <section id="cara" className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="text-3xl font-extrabold">Cara order</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Pilih layanan", "PLN, pulsa, data, BPJS dan lainnya."],
            ["02", "Masukkan nomor", "ID pelanggan atau nomor HP tujuan."],
            ["03", "Bayar", "QRIS, e-wallet, atau virtual account."],
            ["04", "Selesai", "Produk masuk, struk dikirim ke WhatsApp."],
          ].map(([num, title, desc]) => (
            <div key={num} className="card hov p-6">
              <div className="fh text-3xl font-extrabold text-[#12A150]">{num}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-[#6b6358]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEK */}
      <section id="cek" className="mx-auto max-w-3xl px-4 pt-20">
        <div className="card relative overflow-hidden p-6 sm:p-8">
          <h2 className="relative text-2xl font-extrabold">Cek status pesanan</h2>
          <p className="relative mt-1 text-sm text-[#6b6358]">Masukkan nomor invoice dari struk kamu.</p>
          <form
            className="relative mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const v = inv.trim();
              setResult(v ? v.replace(/</g, "") : "");
            }}
          >
            <input value={inv} onChange={(e) => setInv(e.target.value)} className="inp" placeholder="Contoh: INV-20261018-AB12" />
            <button className="btn shrink-0">Cek Status</button>
          </form>
          <div className="relative">
            {result === "" ? (
              <p className="mt-3 text-sm text-red-600">Masukkan nomor invoice dulu.</p>
            ) : result ? (
              <div className="pop mt-4 rounded-xl border border-[#E3E8E5] bg-[#FFFFFF] p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b6358]">Invoice</span>
                  <b>{result}</b>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-[#6b6358]">Status</span>
                  <span className="font-semibold text-green-700">Sukses ✓</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* TESTI */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <h2 className="text-3xl font-extrabold">Kata pelanggan</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["\"Token PLN masuk kurang dari 5 detik, padahal tengah malam. Mantap.\"", "Rina, Bandung"],
            ["\"Bayar BPJS 3 bulan sekaligus jadi gampang, struk langsung ke WA.\"", "Andi, Surabaya"],
            ["\"Harga paket data lebih murah dari aplikasi lain. Langganan terus.\"", "Dewi, Medan"],
          ].map(([quote, who]) => (
            <div key={who} className="card hov p-6">
              <div className="text-[#12A150]">★★★★★</div>
              <p className="mt-3 text-[#3a352e]">{quote}</p>
              <div className="mt-4 text-sm font-semibold">{who}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 pt-20">
        <h2 className="text-3xl font-extrabold">FAQ</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map(([qText, aText]) => (
            <details key={qText} className="card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {qText}
                <span className="pl text-xl text-[#12A150] transition">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#6b6358]">{aText}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#0E8A44] p-8 text-white sm:p-12">
          <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Bayar tagihan bulan ini sekarang, selesai dalam 3 detik.
          </h2>
          <a href="#layanan" className="mt-6 inline-flex rounded-xl bg-[#F6F8F7] px-6 py-3 font-semibold text-[#1c1a17]">
            Mulai Bayar →
          </a>
        </div>
      </section>

      <footer className="border-t border-[#E3E8E5] bg-[#F6F8F7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 text-sm text-[#6b6358]">
          <div>
            <Brand />
            <p className="mt-3">Platform pembayaran tagihan &amp; produk digital.</p>
          </div>
          <div>
            <div className="mb-3 font-semibold text-[#1c1a17]">Layanan</div>
            <a href="/layanan?s=pln" className="block py-1">Token PLN</a>
            <a href="/layanan?s=pulsa" className="block py-1">Pulsa</a>
            <a href="/layanan?s=data" className="block py-1">Paket Data</a>
            <a href="/layanan?s=bpjs" className="block py-1">BPJS</a>
          </div>
          <div>
            <div className="mb-3 font-semibold text-[#1c1a17]">Bantuan</div>
            <a href="#cara" className="block py-1">Cara Order</a>
            <a href="#cek" className="block py-1">Cek Pesanan</a>
            <a href="#faq" className="block py-1">FAQ</a>
          </div>
          <div>
            <div className="mb-3 font-semibold text-[#1c1a17]">Jam Operasional</div>
            <p>24 jam, 7 hari seminggu</p>
          </div>
        </div>
        <div className="border-t border-[#E3E8E5] py-5 text-center text-xs text-[#8f877b]">
          © 2026 ganarvezidea. Semua hak dilindungi.
        </div>
      </footer>
    </>
  );
}
