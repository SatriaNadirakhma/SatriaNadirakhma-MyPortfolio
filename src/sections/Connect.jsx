import { Send, SendMail, ChatBubble as MessageCircle, ChatPlusIn } from "iconoir-react";
import { socialLinks } from "@data/socialLinks";
import { SITE, SECTION_IDS } from "@constants/index";
import Reveal from "@components/Reveal";
import profilePhoto from "@assets/profile1.webp";

const gradMap = {
  GitHub: "from-[#24292e] to-[#6e5494]",
  Instagram: "from-[#feda75] via-[#d62976] to-[#4f5bd5]",
  LinkedIn: "from-[#0077B5] to-[#00a0dc]",
  Reddit: "from-[#FF4500] to-[#FF8700]",
  Behance: "from-[#1769ff] to-[#053eff]",
  WhatsApp: "from-[#25D366] to-[#128C7E]",
};

// Abstract glitch bars from the design template, converted to % of the
// 656×369 canvas so the panel stays fluid at any width.
const BARS = [
  { w: 6.38, h: 12.22, l: -0.17, t: 32.08 },
  { w: 14.34, h: 47.95, l: 10.92, t: 52.05 },
  { w: 30.05, h: 55.49, l: -0.17, t: 44.51 },
  { w: 38.71, h: 34.22, l: -0.17, t: 0.05 },
  { w: 0.14, h: 3.46, l: -0.17, t: 91.26 },
  { w: 15.11, h: 25.21, l: 14.47, t: 0.05 },
  { w: 0.43, h: 1.29, l: 99.74, t: 0.05 },
  { w: 12.88, h: 24.65, l: -0.17, t: 0.05 },
  { w: 3.96, h: 15.65, l: -0.17, t: 0.05 },
  { w: 27.57, h: 90.2, l: 72.58, t: 0 },
  { w: 0.59, h: 1.53, l: 99.57, t: 98.47 },
  { w: 24.33, h: 77.82, l: 25.53, t: 22.19 },
  { w: 5.84, h: 30.22, l: 94.33, t: 38.36 },
  { w: 38.21, h: 99.95, l: 61.95, t: 0.05 },
  { w: 8.61, h: 33.47, l: 91.56, t: 66.53 },
  { w: 24.63, h: 99.95, l: 45.43, t: 0.05 },
  { w: 2.16, h: 4.66, l: 28.8, t: 70.3 },
  { w: 65.14, h: 99.95, l: -0.17, t: 0.05 },
  { w: 3.48, h: 5.01, l: 51.15, t: 94.99 },
];

const Connect = () => {
  return (
    <section id={SECTION_IDS.connect} className="px-0 sm:px-8">
      <Reveal><div className="relative max-w-7xl mx-auto border border-gray-300 dark:border-white/[0.14] -mt-px rounded-b-[4px] p-6 sm:p-8 lg:p-12 bg-[#fafafa]/80 dark:bg-[#080808]/80 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
          {/* Left — visual panel from template */}
          <div
            className="relative w-full lg:w-[369px] lg:max-w-[369px] aspect-square shrink-0 overflow-hidden rounded-lg bg-[#1E1E1E] dark:bg-gradient-to-b dark:from-[#737373] dark:to-[#404040]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 overflow-hidden bg-black">
              {BARS.map((b, i) => (
                <div
                  key={i}
                  className="absolute bg-blue-600/80 dark:bg-gradient-to-b dark:from-white/80 dark:to-[#D9D9D9]/80"
                  style={{
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                    left: `${b.l}%`,
                    top: `${b.t}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 w-[31%] aspect-square -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-gradient-to-b from-[#D9D9D9] via-[#A6A6A6] via-50% to-[#8C8C8C] to-75% to-[#737373]">
              <img
                src={profilePhoto}
                alt=""
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — headline + copy + CTAs */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h2
              className="mt-5 font-modern font-light text-gray-900 dark:text-white leading-[1.04] tracking-normal"
              style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              Let&apos;s{" "}
              <span className="font-modern italic font-semibold text-blue-600 dark:text-blue-400 tracking-[-0.05em]">
                Work
                <br />
              </span>
              Together
            </h2>

            <p className="mt-6 text-base sm:text-lg font-light text-gray-500 dark:text-white/40 leading-relaxed max-w-md">
              Open to collaborations &amp; freelance projects.
              Have a project in mind? Let&apos;s build something great together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${SITE.email}`} className="btn-base btn-primary group">
                <span className="relative w-3.5 h-3.5 inline-block shrink-0" aria-hidden="true">
                  <Send aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <SendMail aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
                Send email
              </a>

              <a
                href="https://wa.me/6285335510121"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base group border border-[#25D366]/40 text-[#1dab54] hover:border-[#25D366]/70 hover:bg-[#25D366]/[0.06] dark:border-[#25D366]/30 dark:text-[#25D366] dark:hover:border-[#25D366]/60 dark:hover:bg-[#25D366]/10"
              >
                <span className="relative w-3.5 h-3.5 inline-block shrink-0" aria-hidden="true">
                  <MessageCircle aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 transition-all duration-200 group-hover:opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <ChatPlusIn aria-hidden="true" focusable="false" className="absolute inset-0 w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="-mx-6 sm:-mx-8 lg:-mx-12 -mb-6 sm:-mb-8 lg:-mb-12 mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-gray-300 dark:border-white/[0.07] divide-x divide-y sm:divide-y-0 divide-gray-300 dark:divide-white/[0.07] overflow-hidden rounded-b-[4px]">
          {socialLinks.map((link) => {
            const grad = gradMap[link.name] || "from-gray-600 to-gray-800";
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="group relative flex flex-col items-center justify-center gap-3 p-6 sm:p-8 text-center overflow-hidden bg-white dark:bg-white/[0.02] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${grad}`}
                  aria-hidden="true"
                />
                <link.icon className="relative w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-xs sm:text-sm font-medium tracking-normal">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div></Reveal>
    </section>
  );
};

export default Connect;
