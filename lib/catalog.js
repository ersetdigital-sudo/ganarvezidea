import { SVC } from "@/lib/data";

const REGION_KEYS = {
  pdam: "wilayah",
  wallet: "provider",
  tv: "provider",
  car: "leasing",
};

export function hydrateServices(catalog) {
  const bySlug = new Map(catalog.services.map((service) => [service.slug, service]));
  const services = {};

  for (const [key, base] of Object.entries(SVC)) {
    const db = bySlug.get(key);
    if (!db) {
      services[key] = { ...base, productKey: key };
      continue;
    }

    const bill = db.jenis === "tagihan";
    const inputKey = db.inputs[0]?.key ?? "nomor_tujuan";
    const regionKey = REGION_KEYS[key] ?? null;

    const products = base.p.map((option) => {
      if (bill) {
        return {
          ...option,
          h: 0,
          bill: true,
          sid: db.dbId,
          inputKey,
          regionKey,
        };
      }
      const product = db.products.find((item) => item.nama === option.t);
      return {
        ...option,
        h: product?.hargaJual ?? option.h,
        sid: db.dbId,
        pid: product?.id,
        inputKey,
        regionKey,
      };
    });

    services[key] = {
      ...base,
      p: products,
      sid: db.dbId,
      bill,
      inputKey,
      regionKey,
    };
  }

  return {
    services,
    brandSlug: catalog.brand.slug,
    methodId: catalog.methods[0]?.id ?? "",
  };
}
