import { cn } from "@/lib/utils";
import { useTheme } from "@context/ThemeContext";

/**
 * Tropical Tide background — diadaptasi dari opensourceui.in
 * (components/tropical-tide-background, MIT) ke sistem tema portfolio.
 *
 * Dipakai SATU KALI untuk satu halaman full (fixed di belakang semua
 * konten, bukan per section):
 *
 *   <div className="min-h-screen relative bg-[#fafafa] dark:bg-[#080808]">
 *     <TropicalTideBackground aria-hidden="true" className="fixed inset-0 pointer-events-none" />
 *     <Sidebar />
 *     <main>...section-section...</main>
 *   </div>
 *
 * - Base TIDAK transparan: solid putih (#fafafa) di light mode,
 *   solid hitam (#080808) di dark mode — mengikuti ThemeContext.
 * - Blob aurora (biru, orange, sentuhan merah) dibuat transparan
 *   sedikit + blur (blur-xl di container, blur-3xl per blob). Palet diambil
 *   dari aksen section: blue-600 #2563EB (hero/links/CTA), blue-400 #60A5FA
 *   (aksen dark mode), orange #F97316 (selection/Champions), red-600 #DC2626
 *   (tombol YouTube Playlist) — merah dibuat paling samar.
 * - Opacity blob diturunkan di dark mode agar teks tetap terbaca.
 * - Panel ledger di tiap section memakai
 *   `bg-[#fafafa]/80 dark:bg-[#080808]/80 backdrop-blur-md` supaya
 *   aurora mengintip lembut dari balik konten (card tetap solid,
 *   jangan transparan).
 */
const BLOB_SETS = [
  // default — komposisi asli opensourceui
  [
    "absolute -left-[16%] bottom-[10%] h-[74%] w-[74%] rounded-full bg-[#2563EB]",
    "absolute top-[-10%] left-[32%] h-[60%] w-[60%] rounded-full bg-[#F97316]",
    "absolute top-[22%] -right-[14%] h-[68%] w-[68%] rounded-full bg-[#60A5FA]",
    "absolute right-[6%] bottom-[-26%] h-[62%] w-[62%] rounded-full bg-[#DC2626]",
  ],
  // mirror — variasi horizontal agar tiap section tidak identik
  [
    "absolute -right-[16%] bottom-[10%] h-[74%] w-[74%] rounded-full bg-[#2563EB]",
    "absolute top-[-10%] right-[32%] h-[60%] w-[60%] rounded-full bg-[#F97316]",
    "absolute top-[22%] -left-[14%] h-[68%] w-[68%] rounded-full bg-[#60A5FA]",
    "absolute left-[6%] bottom-[-26%] h-[62%] w-[62%] rounded-full bg-[#DC2626]",
  ],
  // top-heavy — untuk section pendek (marquee, playlist strip)
  [
    "absolute -left-[20%] top-[-30%] h-[80%] w-[70%] rounded-full bg-[#2563EB]",
    "absolute left-[28%] top-[-24%] h-[66%] w-[56%] rounded-full bg-[#F97316]",
    "absolute -right-[18%] top-[-20%] h-[74%] w-[64%] rounded-full bg-[#60A5FA]",
    "absolute right-[20%] bottom-[-40%] h-[56%] w-[52%] rounded-full bg-[#DC2626]",
  ],
  // bottom-heavy — untuk penutup section (connect, footer)
  [
    "absolute -left-[18%] bottom-[-30%] h-[76%] w-[70%] rounded-full bg-[#2563EB]",
    "absolute left-[30%] bottom-[-28%] h-[62%] w-[56%] rounded-full bg-[#F97316]",
    "absolute -right-[16%] bottom-[-24%] h-[70%] w-[64%] rounded-full bg-[#60A5FA]",
    "absolute right-[22%] top-[-40%] h-[54%] w-[50%] rounded-full bg-[#DC2626]",
  ],
];

// Opacity blob per tema: light vivid tapi transparan sedikit,
// dark jauh lebih redup supaya kontras teks aman. Indeks ke-4 (merah)
// dibuat lebih samar — hanya sentuhan.
const OPACITY_LIGHT = ["opacity-60", "opacity-[0.65]", "opacity-55", "opacity-40"];
const OPACITY_DARK = ["opacity-30", "opacity-[0.32]", "opacity-[0.28]", "opacity-20"];
const OPACITY_SOFT_LIGHT = ["opacity-40", "opacity-45", "opacity-35", "opacity-25"];
const OPACITY_SOFT_DARK = ["opacity-20", "opacity-[0.22]", "opacity-[0.18]", "opacity-[0.12]"];

export function TropicalTideBackground({
  as: Tag = "div",
  children,
  className,
  variant = 0,
  intensity = "vivid",
  ...props
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const blobs = BLOB_SETS[variant % BLOB_SETS.length];
  const opacities = isDark
    ? intensity === "soft"
      ? OPACITY_SOFT_DARK
      : OPACITY_DARK
    : intensity === "soft"
      ? OPACITY_SOFT_LIGHT
      : OPACITY_LIGHT;

  return (
    <Tag
      data-slot="tropical-tide-background"
      className={cn(
        "relative isolate overflow-hidden bg-[#fafafa] dark:bg-[#080808]",
        className
      )}
      {...props}
    >
      {/* Lapisan aurora: transparan sedikit + blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        {/* base solid mengikuti tema — bukan transparan */}
        <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#080808]" />
        {blobs.map((pos, i) => (
          <div key={i} className={cn(pos, opacities[i], "blur-3xl")} />
        ))}
      </div>
      {/* Dot grid halus mengikuti tema */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 [background-size:4px_4px]",
          isDark
            ? "opacity-[0.07] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)]"
            : "opacity-[0.04] [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)]"
        )}
      />
      {children}
    </Tag>
  );
}

export default TropicalTideBackground;
