import { ExternalLink, Music2 } from "lucide-react";
import { SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import PlusCorners from "@components/PlusCorners";
import Album1 from "@assets/album/album-1.webp";
import Album2 from "@assets/album/album-2.webp";
import Album3 from "@assets/album/album-3.webp";
import Album4 from "@assets/album/album-4.webp";
import Album5 from "@assets/album/album-5.webp";

const PLAYLIST_URL = "https://music.youtube.com/@nadirakhma";

const ALBUM_COVERS = [
  { src: Album1, alt: "Community playlist cover 1" },
  { src: Album2, alt: "Community playlist cover 2" },
  { src: Album3, alt: "Community playlist cover 3" },
  { src: Album4, alt: "Community playlist cover 4" },
  { src: Album5, alt: "Community playlist cover 5" },
];

const Playlist = () => {
  return (
    <section id={SECTION_IDS.playlist} className="px-5 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-200 dark:border-white/[0.07] -mt-px p-6 sm:p-8 lg:p-12">
        <PlusCorners />

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-12 sm:mb-14">
          {ALBUM_COVERS.map((cover, index) => (
            <a
              key={cover.src}
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cover.alt} — open playlist`}
              className={`block rounded-[4px] border border-gray-200 dark:border-white/[0.07] overflow-hidden transition-colors duration-150 hover:border-gray-400 dark:hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                index === 3 ? "hidden sm:block" : index === 4 ? "hidden lg:block" : ""
              }`}
            >
              <img
                src={cover.src}
                alt={cover.alt}
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
            </a>
          ))}
        </div>

        <h2
          className="text-center font-modern font-light text-gray-900 dark:text-white leading-[1.08] tracking-[-0.02em]"
          style={{ fontSize: "clamp(30px, 4vw, 44px)" }}
        >
          The{" "}
          <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400">
            playlist
          </span>{" "}
          behind the pixels.
        </h2>

        <p className="mt-6 text-center text-base sm:text-lg font-light text-gray-500 dark:text-white/40 leading-relaxed max-w-md mx-auto">
          What&apos;s on repeat while I design and build — started by me, kept
          alive by everyone who stops by.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
          >
            Open in YouTube Music
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base border border-orange-500/40 text-orange-600 hover:border-orange-500/70 hover:bg-orange-500/[0.04] dark:border-orange-400/30 dark:text-orange-400 dark:hover:border-orange-400/60 dark:hover:bg-orange-400/10"
          >
            <Music2 className="w-3.5 h-3.5" />
            Add a track
          </a>
        </div>
      </div></Reveal>
    </section>
  );
};

export default Playlist;