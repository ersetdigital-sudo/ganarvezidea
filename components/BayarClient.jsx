"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { rp } from "@/lib/data";

const DEFAULT_ORDER = { l: "Token Listrik PLN", n: "14234567890", p: "Token Rp100.000", h: 101500 };

const G = [
  ["QRIS", [["QRIS", "#ea1c24"]]],
  ["E-Wallet", [["DANA", "#118eea"], ["OVO", "#4c3494"], ["GoPay", "#00aa13"], ["ShopeePay", "#f0612b"]]],
  ["Virtual Account", [["BCA", "#005eaa"], ["BRI", "#00529c"], ["Mandiri", "#003d79"], ["BNI", "#f15a23"]]],
];

const FEES = { QRIS: 0, "E-Wallet": 1000, "Virtual Account": 4000 };

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function BayarPage() {
  const [O, setO] = useState(DEFAULT_ORDER);
  const [m, setM] = useState("");
  const [fee, setFee] = useState(0);
  const [wa, setWa] = useState("");
  const [err, setErr] = useState("");
  const [payment, setPayment] = useState(null);
  const [left, setLeft] = useState(900);

  useIsoLayoutEffect(() => {
    try {
      const o = JSON.parse(sessionStorage.order || "null");
      if (o) setO(o);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!payment) return;
    setLeft(900);
    const end = Date.now() + 900e3;
    const iv = setInterval(() => {
      const s = Math.max(0, ((end - Date.now()) / 1000) | 0);
      setLeft(s);
      if (!s) clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, [payment]);

  const total = O.h + fee;

  const payNow = () => {
    if (!m) {
      setErr("Pilih metode pembayaran.");
      return;
    }
    if (wa.length < 9) {
      setErr("Masukkan nomor WhatsApp yang valid.");
      return;
    }
    const d = new Date();
    const inv =
      "INV-" +
      d.toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase();
    const group = G.find((x) => x[1].some((y) => y[0] === m))[0];
    const v1 = Math.random().toString().slice(2, 6);
    const v2 = Math.random().toString().slice(2, 6);
    setPayment({
      inv,
      group,
      method: m,
      total: O.h + fee,
      wa,
      va: "8808 " + v1 + " " + v2,
      qr: Array.from({ length: 64 }, () => Math.random() > 0.5),
    });
    window.scrollTo(0, 0);
  };

  const timer =
    payment && left === 0
      ? "Kedaluwarsa"
      : String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");

  return (
    <>
      <Header focus />
      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-6">
        <nav className="relative text-sm text-[#6b6358]">
          <Link href="/" className="hover:text-[#1c1a17]">Home</Link> /{" "}
          <span className="text-[#1c1a17]">Pembayaran</span>
        </nav>
        <h1 className="relative mt-4 text-2xl font-extrabold sm:text-4xl">Pembayaran</h1>

        {!payment ? (
          <div className="relative mt-6 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="min-w-0 space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="mb-4 font-bold">Metode pembayaran</h2>
                <div className="space-y-5">
                  {G.map(([g, a]) => (
                    <div key={g}>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6b6358]">{g}</div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {a.map(([n]) => (
                          <button
                            key={n}
                            onClick={() => {
                              setM(n);
                              setFee(FEES[g]);
                              setErr("");
                            }}
                            className={`card opt hov flex flex-col items-start gap-2 p-3 ${m === n ? "on" : ""}`}
                          >
                            <Logo name={n} cls="!h-8 !w-full" />
                            <span className="text-xs text-[#6b6358]">
                              {g === "Virtual Account" ? "VA " + n : n}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5 sm:p-6">
                <label className="mb-2 block font-bold">Nomor WhatsApp</label>
                <p className="mb-3 text-sm text-[#6b6358]">Struk dan status pesanan dikirim ke nomor ini.</p>
                <input
                  value={wa}
                  onChange={(e) => setWa(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  className="inp"
                  placeholder="08xx xxxx xxxx"
                />
              </div>
            </div>
            <aside className="card p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="font-bold">Ringkasan pesanan</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  ["Layanan", O.l],
                  ["Nomor", O.n],
                  ["Produk", O.p],
                  ["Harga", rp(O.h)],
                  ["Biaya layanan", rp(fee)],
                  ["Metode", m || "-"],
                ].map(([a, b]) => (
                  <div key={a} className="flex justify-between gap-3">
                    <dt className="text-[#6b6358]">{a}</dt>
                    <dd className="break-all text-right">{b}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-[#E3E8E5] pt-4">
                <span className="font-semibold">Total</span>
                <span className="fh text-2xl font-extrabold text-[#12A150]">{rp(total)}</span>
              </div>
              <button onClick={payNow} className="btn mt-5 w-full">Bayar Sekarang</button>
              <p className="mt-2 text-center text-xs text-red-600">{err}</p>
            </aside>
          </div>
        ) : (
          <div className="relative mx-auto mt-6 max-w-xl">
            <div className="card pop p-6 sm:p-8 text-center">
              <div className="text-sm text-[#6b6358]">Nomor invoice</div>
              <div className="fh mt-1 break-all text-xl font-extrabold">{payment.inv}</div>
              <div className="mt-5 text-sm text-[#6b6358]">Selesaikan pembayaran dalam</div>
              <div className="fh text-5xl font-extrabold text-[#12A150]">{timer}</div>
              <div className="mt-5 flex justify-between border-t border-[#E3E8E5] pt-4 text-sm">
                <span className="text-[#6b6358]">Total bayar</span>
                <b>{rp(payment.total)}</b>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-[#6b6358]">Metode</span>
                <b>{payment.method}</b>
              </div>
              <div className="text-left">
                {payment.group === "QRIS" ? (
                  <>
                    <div className="mx-auto mt-4 grid h-48 w-48 grid-cols-8 gap-0.5 rounded-xl bg-white p-3">
                      {payment.qr.map((black, i) => (
                        <div key={i} className={black ? "bg-black" : ""}></div>
                      ))}
                    </div>
                    <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-[#3a352e]">
                      <li>Buka aplikasi e-wallet atau mobile banking.</li>
                      <li>Pindai kode QRIS di atas.</li>
                      <li>Periksa total lalu konfirmasi pembayaran.</li>
                    </ol>
                  </>
                ) : payment.group === "Virtual Account" ? (
                  <>
                    <div className="mt-4 rounded-xl bg-[#FFFFFF] p-4">
                      <div className="text-xs text-[#6b6358]">Nomor VA {payment.method}</div>
                      <div className="fh mt-1 break-all text-2xl font-extrabold tracking-wider">{payment.va}</div>
                    </div>
                    <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-[#3a352e]">
                      <li>Buka m-banking / ATM {payment.method}.</li>
                      <li>Pilih Transfer › Virtual Account.</li>
                      <li>Masukkan nomor VA dan konfirmasi.</li>
                    </ol>
                  </>
                ) : (
                  <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-[#3a352e]">
                    <li>Buka aplikasi {payment.method} di HP kamu.</li>
                    <li>Setujui notifikasi pembayaran dari ganarvezidea.</li>
                    <li>Masukkan PIN untuk menyelesaikan.</li>
                  </ol>
                )}
              </div>
              <p className="mt-5 text-xs text-[#6b6358]">
                Struk akan dikirim ke WhatsApp {payment.wa}. (Simulasi)
              </p>
              <a href="/" className="btn2 mt-5 w-full">Kembali ke Beranda</a>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
