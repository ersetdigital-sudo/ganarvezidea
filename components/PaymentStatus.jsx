"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rp } from "@/lib/data";

const LABEL = {
  menunggu_cek: "Lagi dicek admin",
  menunggu_bayar: "Menunggu pembayaran",
  sudah_bayar: "Pembayaran dicek admin",
  sukses: "Sukses",
  dibatalkan: "Dibatalkan",
};

const BADGE = {
  menunggu_cek: "bg-[#FFF6CC] text-[#8a6500]",
  menunggu_bayar: "bg-[#FFF6CC] text-[#8a6500]",
  sudah_bayar: "bg-[#E3F4FF] text-[#0A84D6]",
  sukses: "bg-[#E4F7EA] text-[#0E8A44]",
  dibatalkan: "bg-red-100 text-red-600",
};

function fmtDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PaymentStatus({ payment, sn = null }) {
  const [left, setLeft] = useState(null);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (payment.status !== "menunggu_bayar" || !payment.expires_at) {
      setLeft(null);
      return;
    }
    const end = new Date(payment.expires_at).getTime();
    const tick = () => setLeft(Math.max(0, Math.ceil((end - Date.now()) / 1000)));
    tick();
    const iv = window.setInterval(tick, 1000);
    return () => window.clearInterval(iv);
  }, [payment.status, payment.expires_at]);

  const expired =
    payment.status === "menunggu_bayar" && left !== null && left <= 0;
  const status = expired ? "dibatalkan" : payment.status;
  const total = payment.total !== null ? rp(payment.total) : "Belum ditetapkan";
  const timer =
    left === null
      ? "--:--"
      : `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;

  const wa = (payment.wa_cs || "").replace(/\D/g, "");
  const waText = `Halo CS ${payment.nama_brand}, saya ingin konfirmasi pembayaran.\nID: ${payment.ref}\nProduk: ${payment.nama_produk || payment.nama_layanan}\nTujuan: ${payment.nomor_tujuan}\nTotal: ${payment.total !== null ? rp(payment.total) : "belum ditetapkan"}\n\nBukti transfer saya lampirkan.`;
  const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(waText)}` : null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(payment.ref);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setNotice("ID tidak bisa disalin otomatis.");
    }
  }

  return (
    <main className="relative mx-auto max-w-3xl px-4 pb-16 pt-6">
      <nav className="relative text-sm text-[#6b6358]">
        <Link href="/" className="hover:text-[#1c1a17]">Home</Link> /{" "}
        <span className="text-[#1c1a17]">Pembayaran</span>
      </nav>
      <h1 className="relative mt-4 text-2xl font-extrabold sm:text-4xl">Pembayaran</h1>

      <div className="card pop relative mt-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className={`badge ${BADGE[status]}`}>
              {LABEL[status]}
            </span>
            <h2 className="mt-3 break-all text-xl font-extrabold">{payment.ref}</h2>
            <p className="mt-1 text-xs text-[#6b6358]">
              Dibuat {fmtDate(payment.created_at)}
            </p>
          </div>
          <button type="button" onClick={copy} className="btn2 shrink-0 !px-3 !py-2 text-xs">
            {copied ? "Tersalin" : "Salin ID"}
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-[#1c1a17] px-5 py-4 text-white">
          <p className="text-xs text-white/60">Total bayar</p>
          <p className="fh text-3xl font-extrabold">{total}</p>
          <p className="mt-1 text-xs text-white/60">
            {payment.nama_produk || payment.nama_layanan} · {payment.nomor_tujuan}
          </p>
        </div>

        {status === "menunggu_cek" ? (
          <div className="mt-5 rounded-xl border border-[#FFF6CC] bg-[#FFF6CC]/40 p-4 text-sm">
            <b>Tagihan sedang dicek admin.</b>
            <p className="mt-1 text-[#5a4b2e]">
              Nominal dan link bayar dikirim ke WhatsApp kamu pada jam cek{" "}
              {payment.jam_cek_tagihan || "08.00 - 21.00"}.
            </p>
          </div>
        ) : null}

        {status === "menunggu_bayar" && !expired ? (
          <>
            <div className="mt-5 rounded-xl border border-[#E3E8E5] p-4">
              {payment.tipe_metode === "qr" ? (
                <div className="text-center">
                  <p className="text-sm text-[#6b6358]">Scan QRIS di bawah</p>
                  {payment.qris_image_url ? (
                    <a href={payment.qris_image_url} target="_blank" rel="noreferrer" className="mt-3 block">
                      <img
                        src={payment.qris_image_url}
                        alt="QRIS pembayaran"
                        className="mx-auto h-auto w-full max-w-[300px] rounded-xl bg-white"
                      />
                    </a>
                  ) : null}
                  <p className="mt-3 text-xs text-[#6b6358]">
                    Masukkan nominal persis <b>{total}</b>.
                  </p>
                </div>
              ) : payment.tipe_metode === "va" ? (
                <div className="text-center">
                  <p className="text-sm text-[#6b6358]">{payment.metode_bayar}</p>
                  <p className="fh mt-2 text-2xl font-extrabold tracking-wider">
                    8808 {payment.ref.slice(-8, -4)} {payment.ref.slice(-4)} 21
                  </p>
                </div>
              ) : (
                <p className="text-center text-sm text-[#6b6358]">
                  Selesaikan pembayaran lewat <b>{payment.metode_bayar}</b>.
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#FFF6CC] px-4 py-3">
              <span className="text-sm font-semibold">Bayar sebelum</span>
              <span className="fh text-xl font-extrabold">{timer}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setNotice("Pembayaran kamu sedang dicek admin. Simpan ID pesanan ini.");
                if (waHref) window.open(waHref, "_blank", "noopener,noreferrer");
              }}
              className="btn mt-5 w-full"
            >
              Saya Sudah Bayar
            </button>
          </>
        ) : null}

        {status === "sudah_bayar" ? (
          <div className="mt-5 rounded-xl bg-[#E3F4FF] p-4 text-sm text-[#0A6CA6]">
            Pembayaran sudah dikonfirmasi. Admin sedang memproses pesanan kamu.
          </div>
        ) : null}

        {status === "sukses" ? (
          <div className="mt-5 rounded-xl bg-[#E4F7EA] p-4 text-sm">
            <b>Transaksi sukses.</b>
            {sn ? (
              <p className="mt-2">
                {/PLN/i.test(payment.nama_layanan) ? "Token" : "Serial number"}:{" "}
                <b className="font-mono">{sn}</b>
              </p>
            ) : null}
          </div>
        ) : null}

        {status === "dibatalkan" ? (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Pesanan sudah dibatalkan{expired ? " karena waktu habis" : ""}. Silakan buat pesanan baru.
          </div>
        ) : null}

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-[#6b6358]">Metode</dt>
            <dd className="font-semibold">{payment.metode_bayar || "-"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-[#6b6358]">Biaya admin</dt>
            <dd className="font-semibold">{rp(payment.biaya_admin)}</dd>
          </div>
          {payment.potongan > 0 ? (
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b6358]">Potongan</dt>
              <dd className="font-semibold text-[#0E8A44]">-{rp(payment.potongan)}</dd>
            </div>
          ) : null}
          {payment.expires_at && status === "menunggu_bayar" ? (
            <div className="flex justify-between gap-3">
              <dt className="text-[#6b6358]">Batas bayar</dt>
              <dd className="font-semibold">{fmtDate(payment.expires_at)}</dd>
            </div>
          ) : null}
        </dl>

        {notice ? (
          <p className="mt-4 text-center text-sm font-semibold text-[#0E8A44]" aria-live="polite">
            {notice}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {waHref ? (
            <a href={waHref} target="_blank" rel="noreferrer" className="btn flex-1">
              Konfirmasi via WhatsApp
            </a>
          ) : null}
          <Link href={`/?q=${encodeURIComponent(payment.ref)}#cek`} className="btn2 flex-1">Cek Status</Link>
        </div>
      </div>
    </main>
  );
}
