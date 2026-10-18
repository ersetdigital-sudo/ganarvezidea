import "./globals.css";

export const metadata = {
  title: "ganarvezidea — Bayar Tagihan & Produk Digital",
  description: "Platform pembayaran tagihan & produk digital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="gridbg min-h-screen">{children}</body>
    </html>
  );
}
