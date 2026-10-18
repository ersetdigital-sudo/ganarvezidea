export const rp = (n) => "Rp" + Number(n).toLocaleString("id-ID");

export const SVC = {
  pln: {
    n: "Token Listrik PLN",
    i: "pln",
    lbl: "Nomor Meter / ID Pelanggan",
    ph: "Contoh: 14234567890",
    d: "Beli token listrik prabayar, token langsung terkirim dalam hitungan detik.",
    p: [
      [20000, 21500],
      [50000, 51500],
      [100000, 101500],
      [200000, 201500],
      [500000, 501500],
      [1000000, 1001500],
    ].map(([a, b]) => ({ t: "Token " + rp(a), h: b })),
  },
  pulsa: {
    n: "Pulsa",
    i: "pulsa",
    lbl: "Nomor HP",
    ph: "08xx xxxx xxxx",
    op: 1,
    d: "Isi pulsa semua operator, harga bersaing dan masuk instan.",
    p: [5, 10, 20, 25, 50, 100, 150, 200].map((a) => ({
      t: "Pulsa " + a + "rb",
      h: a * 1000 + 1500,
    })),
  },
  data: {
    n: "Paket Data",
    i: "data",
    lbl: "Nomor HP",
    ph: "08xx xxxx xxxx",
    op: 1,
    d: "Paket internet harian sampai bulanan untuk semua operator.",
    p: [
      ["3GB / 7 hari", 15000],
      ["8GB / 30 hari", 35000],
      ["15GB / 30 hari", 55000],
      ["25GB / 30 hari", 75000],
      ["50GB / 30 hari", 110000],
      ["Unlimited / 30 hari", 135000],
    ].map(([t, h]) => ({ t, h })),
  },
  bpjs: {
    n: "BPJS Kesehatan",
    i: "bpjs",
    lbl: "Nomor VA / No. Kartu BPJS",
    ph: "88888 0123 4567 890",
    d: "Bayar iuran BPJS Kesehatan untuk 1 sampai 6 bulan sekaligus.",
    p: [1, 2, 3, 4, 5, 6].map((m) => ({ t: m + " bulan", h: m * 150000 + 2500 })),
  },
  pdam: {
    n: "Tagihan PDAM",
    i: "pdam",
    lbl: "Nomor Pelanggan PDAM",
    ph: "Contoh: 0012345678",
    reg: [
      "Wilayah PDAM",
      [
        "PDAM DKI Jakarta (PAM Jaya)",
        "PDAM Kota Bandung",
        "PDAM Surya Sembada Surabaya",
        "PDAM Tirta Nadi Medan",
        "PDAM Kota Semarang",
        "PDAM Kota Makassar",
      ],
    ],
    d: "Bayar tagihan air PDAM di berbagai wilayah Indonesia.",
    p: [
      { t: "Tagihan bulan ini", h: 187500 },
      { t: "Tagihan 2 bulan", h: 372000 },
    ],
  },
  wallet: {
    n: "Top Up E-Wallet",
    i: "wallet",
    lbl: "Nomor HP Terdaftar",
    ph: "08xx xxxx xxxx",
    reg: ["Pilih e-wallet", ["DANA", "OVO", "GoPay", "ShopeePay", "LinkAja"]],
    d: "Isi saldo DANA, OVO, GoPay, ShopeePay dan LinkAja, saldo masuk instan.",
    pt: "Pilih nominal top up",
    p: [20000, 50000, 100000, 150000, 200000, 500000].map((a) => ({
      t: "Saldo " + rp(a),
      h: a + 1000,
    })),
  },
  tv: {
    n: "Internet & TV Kabel",
    i: "tv",
    lbl: "Nomor Pelanggan",
    ph: "Contoh: 1234567890",
    reg: [
      "Pilih provider",
      [
        "IndiHome",
        "First Media",
        "Biznet",
        "MNC Vision",
        "Transvision",
        "MyRepublic",
      ],
    ],
    d: "Bayar tagihan internet rumah dan TV berlangganan tanpa antre.",
    pt: "Pilih tagihan",
    p: [
      { t: "Tagihan bulan ini", h: 345000 },
      { t: "Tagihan + denda", h: 395000 },
      { t: "Tagihan 2 bulan", h: 690000 },
    ],
  },
  car: {
    n: "Cicilan Multifinance",
    i: "car",
    lbl: "Nomor Kontrak",
    ph: "Contoh: 0123456789012",
    reg: [
      "Pilih perusahaan pembiayaan",
      [
        "Adira Finance",
        "FIF Group",
        "BAF",
        "WOM Finance",
        "Mandiri Utama Finance",
        "Mega Finance",
      ],
    ],
    d: "Bayar angsuran motor dan mobil di berbagai leasing, tepat waktu tanpa denda.",
    pt: "Pilih angsuran",
    p: [
      { t: "Angsuran 1 bulan", h: 1250000 },
      { t: "Angsuran 2 bulan", h: 2500000 },
      { t: "Angsuran + denda", h: 1312500 },
    ],
  },
};

export const OPS = [
  ["Telkomsel", "#e4002b", ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"]],
  ["Indosat", "#f5b400", ["0814", "0815", "0816", "0855", "0856", "0857", "0858"]],
  ["XL", "#0d4ea6", ["0817", "0818", "0819", "0859", "0877", "0878"]],
  ["Axis", "#7b2ab8", ["0831", "0832", "0833", "0838"]],
  ["Tri", "#d6127f", ["0895", "0896", "0897", "0898", "0899"]],
  ["Smartfren", "#e8115b", ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"]],
];

export const detectOp = (v) => {
  v = v.replace(/\D/g, "").replace(/^62/, "0");
  const p = v.slice(0, 4);
  return OPS.find((o) => o[2].includes(p));
};

export const LOGO_IMAGES = {
  Telkomsel: "/images/fe642707-a6b6-4b06-89d9-42f785aa4419.png",
  Indosat: "/images/5a59987a-722e-416e-afad-84cb94dc2e22.png",
  XL: "/images/debb644f-dfdf-402c-967e-137062faaf36.png",
  Axis: "/images/e3ad6ddf-c204-42ec-ad86-7f43054e17e5.png",
  Smartfren: "/images/0b0d2eb5-8d6b-4130-ac18-f0e93efd4f0d.png",
  DANA: "/images/248e11b4-2849-42fa-8a09-e1987efe9d3e.png",
  OVO: "/images/76a7673a-17f6-44a2-9dda-0b4be3773802.png",
  GoPay: "/images/f8592401-3679-40de-94ab-a4960b857771.png",
  ShopeePay: "/images/3723daad-da44-4ae3-80b1-b3463f295f7b.png",
  BCA: "/images/87bd109a-477d-4206-a291-c7004c8ce140.png",
  BRI: "/images/e64f3228-a8f8-4dcc-a383-02f975faffc2.png",
  Mandiri: "/images/fc0a3037-cbd3-48c6-b50f-e3ee84660114.png",
  BNI: "/images/f23899ad-4ef0-442a-b14e-a59dfde1975b.png",
};

export const SERVICES = [
  ["pln", "Token PLN", "Listrik", "/layanan?s=pln"],
  ["pulsa", "Pulsa", "Pulsa & Data", "/layanan?s=pulsa"],
  ["data", "Paket Data", "Pulsa & Data", "/layanan?s=data"],
  ["pdam", "PDAM", "Tagihan", "/layanan?s=pdam"],
  ["bpjs", "BPJS Kesehatan", "Tagihan", "/layanan?s=bpjs"],
  ["tv", "Internet & TV", "Tagihan", "/layanan?s=tv"],
  ["wallet", "E-Wallet", "E-Wallet", "/layanan?s=wallet"],
  ["car", "Multifinance", "Cicilan", "/layanan?s=car"],
];

export const CATEGORIES = ["Semua", "Listrik", "Pulsa & Data", "Tagihan", "E-Wallet", "Cicilan"];
