import Link from "next/link";
import Header from "@/components/Header";
import PaymentStatus from "@/components/PaymentStatus";
import { getOrderByRef, getPaymentByRef } from "@/lib/db/server";

export const metadata = {
  title: "Pembayaran — ganarvezidea",
};

export default async function BayarPage({ searchParams }) {
  const params = await searchParams;
  const ref = typeof params?.ref === "string" ? params.ref.trim() : "";
  const [payment, order] = ref
    ? await Promise.all([getPaymentByRef(ref), getOrderByRef(ref)])
    : [{ data: null, error: "Pesanan tidak ditemukan." }, { data: null }];

  return (
    <>
      <Header focus />
      {!payment.data ? (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="card p-8">
            <h1 className="text-2xl font-extrabold">Pesanan tidak ditemukan</h1>
            <p className="mt-2 text-sm text-[#6b6358]">
              {ref ? payment.error : "Halaman ini dibuka tanpa ID pesanan."}
            </p>
            <Link href="/#layanan" className="btn mt-6">
              Pilih layanan
            </Link>
          </div>
        </main>
      ) : (
        <PaymentStatus
          payment={payment.data}
          sn={order.data?.[0]?.sn ?? null}
        />
      )}
    </>
  );
}
