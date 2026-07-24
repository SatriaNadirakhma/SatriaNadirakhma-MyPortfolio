import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@context/ThemeContext";
import { ExternalLink, Music2, Users, Youtube } from "lucide-react";
import { SECTION_IDS } from "@constants/index";

import { MagneticButton } from "@/components/ui/magnetic-button";

// TODO — replace with your real playlist.
// YouTube Music playlists also support "Collaborative" mode (toggle it
// in the app) so visitors with the link can add tracks, not just listen.
// If that's not available on your account/region yet, point the second
// CTA below at a suggestion form instead.
//
// YouTube Music doesn't have its own embeddable player, but every
// YT Music playlist is backed by a regular YouTube playlist ID, so the
// standard YouTube "videoseries" embed works fine here.
const PLAYLIST_URL = "https://music.youtube.com/playlist?list=YOUR_PLAYLIST_ID";
const PLAYLIST_EMBED_SRC = "https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID";

// TODO — swap in the friends who've actually added tracks.
// Drop an `avatar` key (an imported image, same pattern as Profile1 in
// Hero.jsx) on any entry once you have real photos — falls back to
// initials automatically until then.

const Playlist = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const sectionRef = useRef(null);

  // Same scroll-scrub tilt used on the Hero profile card, run off this
  // section's own scroll range so the embed card gets a matching sense
  // of depth as it enters/leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const s = useMemo(
    () => ({
      eyebrowLine: {
        background: isDark ? "rgba(147,197,253,0.5)" : "rgba(59,130,246,0.5)",
      },
      eyebrowText: {
        color: isDark ? "rgba(147,197,253,0.6)" : "rgba(37,99,235,0.7)",
      },
      divider: {
        background: isDark ? "rgba(147,197,253,0.2)" : "rgba(59,130,246,0.25)",
      },
      pill: {
        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
      },
    }),
    [isDark]
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.playlist}
      className="relative px-5 sm:px-8 py-24 sm:py-32 overflow-hidden bg-[#fafafa] dark:bg-[#080808] transition-colors duration-300"
    >
      {/* Same backdrop language as Hero — radial glow + gridlines — but
          anchored top-right this time so the two sections don't read as
          literal repeats of each other while still sharing one palette. */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: isDark ? 0.5 : 0.25,
          transition: "opacity 300ms",
          background: "radial-gradient(70% 90% at 100% 0%, #3b82f6 40%, #f97316 100%)",
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
          WebkitMaskImage: "radial-gradient(60% 60% at 100% 0%, black 0%, transparent 70%)",
          maskImage: "radial-gradient(60% 60% at 100% 0%, black 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col"
          >

            <h2
              className={`font-modern font-bold leading-[1.05] mb-6 transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              The playlist behind
              <br />
              the pixels.
            </h2>

            <div className="w-64 h-px mb-6 transition-colors duration-300" style={s.divider} />

            <p
              className={`font-modern text-sm sm:text-base leading-relaxed mb-8 max-w-md transition-colors duration-300 ${
                isDark ? "text-white/45" : "text-gray-500"
              }`}
            >
              What's on repeat while I design and build — started by me,
              kept alive by everyone who stops by. Press play, or add
              whatever you've got on repeat too.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <MagneticButton>
                <a
                  href={PLAYLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-linear-to-b from-blue-500 to-blue-700 px-5 sm:px-6 py-2.5 font-modern text-xs sm:text-sm font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 ring-inset transition-transform duration-150 active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
          </motion.div>

          {/* RIGHT — embed card, tilts in on scroll like the Hero profile card */}
          <motion.div
            style={{ rotateX: cardRotateX, y: cardY, perspective: 1000, transformStyle: "preserve-3d" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[420px] rounded-2xl border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none bg-white dark:bg-[#080808] transition-colors duration-300 p-3">
              <div className="flex items-center justify-between px-2 pb-3">
                <span
                  className={`inline-flex items-center gap-1.5 font-modern text-[11px] tracking-wide transition-colors duration-300 ${
                    isDark ? "text-white/45" : "text-gray-500"
                  }`}
                >
                  <Youtube className="w-3.5 h-3.5" />
                  Live on YouTube Music
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
              </div>

              <div className="rounded-xl overflow-hidden aspect-video">
                <iframe
                  title="Community Playlist"
                  src={PLAYLIST_EMBED_SRC}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Playlist;