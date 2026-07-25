import { useMemo } from "react";
import { motion } from "motion/react";
import { useTheme } from "@context/ThemeContext";
import { ExternalLink, Music2 } from "lucide-react";
import { SECTION_IDS } from "@constants/index";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TiltedCard } from "@/components/ui/tilted-card";
import Album1 from "@assets/album/album-1.webp";
import Album2 from "@assets/album/album-2.webp";
import Album3 from "@assets/album/album-3.webp";
import Album4 from "@assets/album/album-4.webp";
import Album5 from "@assets/album/album-5.webp";

const PLAYLIST_URL = "https://music.youtube.com/@nadirakhma";

const ALBUM_COVERS = [
  { src: Album1, alt: "Community playlist cover 1", caption: "Added by Nadi Rakhma" },
  { src: Album2, alt: "Community playlist cover 2", caption: "Added by Nadi Rakhma" },
  { src: Album3, alt: "Community playlist cover 3", caption: "Added by Nadi Rakhma" },
  { src: Album4, alt: "Community playlist cover 4", caption: "Added by Nadi Rakhma" },
  { src: Album5, alt: "Community playlist cover 5", caption: "Added by Nadi Rakhma" },
];

const Playlist = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const s = useMemo(
    () => ({
      divider: {
        background: isDark ? "rgba(147,197,253,0.2)" : "rgba(59,130,246,0.25)",
      },
      stroke: {
        color: isDark ? "rgba(147,197,253,0.65)" : "rgba(37,99,235,0.6)",
        fontStyle: "italic",
        WebkitTextStroke: isDark
          ? "1px rgba(147,197,253,0.5)"
          : "1px rgba(37,99,235,0.5)",
      },
    }),
    [isDark]
  );

  return (
    <section
      id={SECTION_IDS.playlist}
      className="relative px-5 sm:px-8 py-24 sm:py-32 overflow-hidden bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300"
    >

      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: isDark ? 0.5 : 0.25,
          transition: "opacity 300ms",
          background: "radial-gradient(60% 70% at 50% 0%, #3b82f6 30%, #f97316 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: isDark
            ? "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 0%, black 0%, transparent 70%)",
          maskImage: "radial-gradient(60% 60% at 50% 0%, black 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-5 w-full mb-12 sm:mb-16"
        >
          {ALBUM_COVERS.map((cover) => (
            <div key={cover.src} className="w-full aspect-square">
              <TiltedCard
                imageSrc={cover.src}
                altText={cover.alt}
                captionText={cover.caption}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.08}
                showMobileWarning={false}
              />
            </div>
          ))}
        </motion.div>

        <h2
          className={`font-modern font-bold leading-[1.05] mb-6 transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
        >
          The {" "}
          <span style={s.stroke}>playlist</span>{" "}
          behind the pixels.
        </h2>

        <div className="w-64 h-px mb-6 transition-colors duration-300" style={s.divider} />

        <p
          className={`font-modern text-sm sm:text-base leading-relaxed mb-8 max-w-md transition-colors duration-300 ${
            isDark ? "text-white/45" : "text-gray-500"
          }`}
        >
          What's on repeat while I design and build, started by me,
          kept alive by everyone who stops by. Press play, or add
          whatever you've got on repeat too.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <MagneticButton>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-red-500 to-red-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-red-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Open in YouTube Music
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-orange-500 to-orange-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-orange-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Music2 className="w-3.5 h-3.5" />
              Add a Track
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Playlist;