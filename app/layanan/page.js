import LayananClient from "@/components/LayananClient";
import { SVC } from "@/lib/data";

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
  return <LayananClient initialKey={initialKey} />;
}
