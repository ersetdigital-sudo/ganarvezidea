import LayananClient from "@/components/LayananClient";
import { SVC } from "@/lib/data";
import { hydrateServices } from "@/lib/catalog";
import { getCatalog } from "@/lib/db/server";

async function resolveKey(searchParams) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.s) ? sp.s[0] : sp?.s;
  return SVC[raw] ? raw : "pln";
}

export async function generateMetadata({ searchParams }) {
  const key = await resolveKey(searchParams);
  return { title: SVC[key].n + " — ganarvezidea" };
}

export default async function LayananPage({ searchParams }) {
  const initialKey = await resolveKey(searchParams);
  const catalog = await getCatalog();
  const hydrated = catalog.data ? hydrateServices(catalog.data) : null;
  return (
    <LayananClient
      initialKey={initialKey}
      services={hydrated?.services ?? SVC}
      brandSlug={hydrated?.brandSlug ?? ""}
      methodId={hydrated?.methodId ?? ""}
    />
  );
}
