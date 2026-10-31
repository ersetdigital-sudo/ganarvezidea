"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Icon, { ServiceIcon } from "@/components/Icon";
import Logo from "@/components/Logo";
import { OPS, detectOp, rp } from "@/lib/data";
import { createBillCheck, createOrder } from "@/lib/db/client";
import { toPublicError } from "@/lib/db/errors";
import { saveRef } from "@/lib/refs";

export default function LayananClient({ initialKey, services, brandSlug, methodId }) {
  const router = useRouter();
  const key = initialKey;
  const S = services[key] ?? Object.values(services)[0];

  const [sel, setSel] = useState(-1);
  const [no, setNo] = useState("");
  const [region, setRegion] = useState(S.reg ? S.reg[1][0] : "");
  const [wa, setWa] = useState("");
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  let ptTitle = "Pilih nominal";
  if (key === "bpjs") ptTitle = "Pilih jumlah bulan iuran";
  if (key === "data") ptTitle = "Pilih paket";
  if (key === "pdam") ptTitle = "Pilih tagihan";
  if (S.pt) ptTitle = S.pt;

  const detected = S.op ? detectOp(no) : null;
  const digits = no.replace(/\D/g, "");

  const go = async () => {
    if (no.length < 6) {
      setErr("Masukkan nomor yang valid.");
      return;
    }
    if (sel < 0) {
      setErr("Pilih nominal/produk dulu.");
      return;
    }
    if (!brandSlug || !methodId) {
      setErr("Pembayaran belum tersedia. Coba lagi sebentar.");
      return;
    }

    const chosen = S.p[sel];
    if (!chosen?.sid) {
      setErr("Produk ini belum tersedia. Coba pilih produk lain.");
      return;
    }

    const input = { [S.inputKey || chosen.inputKey || "nomor_tujuan"]: no };
    if (S.regionKey && region) input[S.regionKey] = region;
    if (S.bill) input.durasi = chosen.t;

    setErr("");
    setPending(true);
    try {
      let ref;
      if (S.bill) {
        if (wa.replace(/\D/g, "").length < 9) {
          setErr("Masukkan nomor WhatsApp yang valid (minimal 9 angka).");
          setPending(false);
          return;
        }
        const created = await createBillCheck({
          brandSlug,
          serviceId: chosen.sid,
          nomorTujuan: no,
          input,
          waPembeli: wa.replace(/\D/g, ""),
          paymentMethodId: methodId,
        });
        ref = created.ref;
      } else {
        if (!chosen.pid) {
          setErr("Nominal ini belum tersedia. Coba pilih nominal lain.");
          setPending(false);
          return;
        }
        const created = await createOrder({
          brandSlug,
          serviceId: chosen.sid,
          productId: chosen.pid,
          nomorTujuan: no,
          input,
          paymentMethodId: methodId,
        });
        ref = created.ref;
      }
      saveRef(ref);
      router.push(`/bayar?ref=${encodeURIComponent(ref)}`);
    } catch (error) {
      setErr(toPublicError(error).message);
      setPending(false);
    }
  };

  return (
    <>
      <Header focus />
      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-6">
        <nav className="relative text-sm text-[#6b6358]">
          <Link href="/" className="hover:text-[#1c1a17]">Home</Link> /{" "}
          <Link href="/#layanan" className="hover:text-[#1c1a17]">Layanan</Link> /{" "}
          <span className="text-[#1c1a17]">{S.n}</span>
        </nav>
        <div id="tabs" className="relative mt-4 hidden flex-wrap gap-2 md:flex">
          {Object.entries(services).map(([x, v]) => (
            <a key={x} href={`/layanan?s=${x}`} className={`chip inline-flex items-center gap-1.5 ${x === key ? "on" : ""}`}>
              <Icon name={v.i} className="h-4 w-4 shrink-0" />
              {v.n}
            </a>
          ))}
        </div>
        <div className="relative mt-6 flex items-center gap-4">
          <ServiceIcon name={S.i} className="w-20 shrink-0 sm:w-24" />
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold sm:text-4xl">{S.n}</h1>
            <p className="mt-1 text-sm text-[#6b6358] sm:text-base">{S.d}</p>
          </div>
        </div>
        <div className="relative mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="min-w-0 space-y-6">
            <div className="card p-5 sm:p-6">
              <div className={`mb-4 ${S.reg ? "" : "hidden"}`}>
                <label className="mb-2 block text-sm font-semibold">
                  {S.reg ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-[#12A150]">
                        <Icon name="pin" className="h-4 w-4 shrink-0" />
                      </span>
                      {S.reg[0]}
                    </span>
                  ) : null}
                </label>
                <select className="inp" value={region} onChange={(e) => setRegion(e.target.value)}>
                  {S.reg ? S.reg[1].map((x) => <option key={x}>{x}</option>) : null}
                </select>
              </div>
              <label className="mb-2 block text-sm font-semibold">{S.lbl}</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#12A150]">
                  <Icon name={S.op ? "phone" : "id"} className="h-4 w-4 shrink-0" />
                </span>
                <input
                  value={no}
                  onChange={(e) => {
                    setNo(e.target.value.replace(/[^\d]/g, ""));
                    setErr("");
                  }}
                  inputMode="numeric"
                  className="inp !pl-11 pr-28"
                  placeholder={S.ph}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2">
                  {detected ? <Logo name={detected[0]} cls="pop" /> : null}
                </span>
              </div>
              {S.bill && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold">
                    Nomor WhatsApp (untuk link bayar)
                  </label>
                  <input
                    value={wa}
                    onChange={(e) => {
                      setWa(e.target.value.replace(/\D/g, ""));
                      setErr("");
                    }}
                    inputMode="numeric"
                    className="inp"
                    placeholder="08xx xxxx xxxx"
                  />
                  <p className="mt-2 text-xs text-[#6b6358]">
                    Nominal dan link bayar dikirim admin ke WhatsApp ini.
                  </p>
                </div>
              )}
              <p className={`mt-2 text-xs text-[#6b6358] ${S.op ? "" : "hidden"}`}>
                {detected ? (
                  <span className="text-green-700">✓ Terdeteksi: <b>{detected[0]}</b></span>
                ) : digits.length >= 4 ? (
                  <span className="text-red-600">Operator tidak dikenali, cek kembali nomor kamu.</span>
                ) : (
                  "Operator akan terdeteksi otomatis dari 4 digit awal nomor."
                )}
              </p>
              <div className={`mt-4 grid-cols-3 gap-2 sm:grid-cols-6 ${S.op ? "grid" : "hidden"}`}>
                {S.op
                  ? OPS.map((o) => (
                      <div
                        key={o[0]}
                        className={`opcard card flex items-center justify-center p-2 ${
                          detected && detected[0] === o[0] ? "on" : ""
                        }`}
                      >
                        <Logo name={o[0]} />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="card p-5 sm:p-6">
              <h2 className="mb-4 font-bold">
                <span className="inline-flex items-center gap-2">
                  <span className="text-[#12A150]">
                    <Icon name={S.i} className="h-4 w-4 shrink-0" />
                  </span>
                  {ptTitle}
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {S.p.map((p, i) => {
                  const active = i === sel;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSel(i);
                        setErr("");
                      }}
                      className={`card opt hov relative p-4 text-left ${active ? "on" : ""}`}
                    >
                      <span
                        className={`absolute right-3 top-3 ${
                          active ? "flex" : "hidden"
                        } h-5 w-5 items-center justify-center rounded-full bg-[#12A150] text-[#1c1a17]`}
                      >
                        <Icon name="check" className="h-3 w-3 shrink-0" />
                      </span>
                      <div className="text-sm font-bold">{p.t}</div>
                      <div className="mt-2 text-sm font-semibold text-[#12A150]">
                        {p.bill ? "Cek tagihan" : rp(p.h)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <aside className="card p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-bold">Ringkasan pesanan</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6358]">Layanan</dt>
                <dd className="text-right">{S.n}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6358]">Nomor</dt>
                <dd className="break-all text-right">{no || "-"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6358]">Produk</dt>
                <dd className="text-right">{sel >= 0 ? S.p[sel].t : "-"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#6b6358]">Biaya admin</dt>
                <dd>Rp0</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-[#E3E8E5] pt-4">
              <span className="font-semibold">Total</span>
              <span className="fh text-2xl font-extrabold text-[#12A150]">
                {sel >= 0 && S.p[sel].bill ? "Cek tagihan" : rp(sel >= 0 ? S.p[sel].h : 0)}
              </span>
            </div>
            <button onClick={go} disabled={pending} className="btn mt-5 w-full disabled:opacity-60">
              {pending ? "Memproses…" : "Lanjut Bayar"}
            </button>
            <p className="mt-2 text-center text-xs text-red-600">{err}</p>
          </aside>
        </div>
      </main>
    </>
  );
}
