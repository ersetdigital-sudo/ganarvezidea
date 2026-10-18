import { LOGO_IMAGES } from "@/lib/data";

export default function Logo({ name, cls = "" }) {
  const src = LOGO_IMAGES[name];
  if (src) {
    return <img src={src} alt={name} className={"oplogo object-contain " + cls} />;
  }
  return <i className={`oplogo op-${name} pm-${name} ${cls}`} />;
}
