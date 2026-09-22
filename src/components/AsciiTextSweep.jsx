import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

// Same ramp as Logo3D's AsciiEffect (light -> heavy), reused here so the
// "interfaces" sweep reads as part of the same ascii-texture language as
// the hero's 3D mark, not an unrelated effect.
const RAMP = " .,-~:;=!*#$@";
const randomRampChar = () => RAMP[Math.floor(Math.random() * RAMP.length)];

/**
 * Per-character scramble-decode sweep, left to right. Call `.play(times)`
 * via ref to run `times` sequential passes (each pass: every character
 * flickers through a few random ramp glyphs before settling on the real
 * letter, staggered left -> right), then it calls `onSequenceEnd` and
 * goes idle until played again.
 *
 * Accessible: the visible per-character spans are aria-hidden, the real
 * word is exposed once via aria-label on the wrapper.
 */
const AsciiTextSweep = forwardRef(function AsciiTextSweep(
  {
    text,
    className = "",
    charDelay = 35,
    scrambleDuration = 260,
    passGap = 220,
    onSequenceEnd,
    onMouseEnter,
    onMouseLeave,
  },
  ref
) {
  const letters = useRef(text.split(""));
  const [display, setDisplay] = useState(letters.current);
  const playingRef = useRef(false);
  const timeoutsRef = useRef([]);
  const prefersReducedRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const runOnePass = useCallback(() => {
    return new Promise((resolve) => {
      const chars = letters.current;
      let settledCount = 0;
      const flips = 4;
      const flipInterval = scrambleDuration / flips;

      chars.forEach((ch, i) => {
        if (ch === " ") {
          settledCount++;
          if (settledCount === chars.length) resolve();
          return;
        }
        const startDelay = i * charDelay;
        for (let f = 0; f < flips; f++) {
          const t = setTimeout(() => {
            setDisplay((prev) => {
              const next = [...prev];
              next[i] = f === flips - 1 ? ch : randomRampChar();
              return next;
            });
            if (f === flips - 1) {
              settledCount++;
              if (settledCount === chars.length) resolve();
            }
          }, startDelay + f * flipInterval);
          timeoutsRef.current.push(t);
        }
      });
    });
  }, [charDelay, scrambleDuration]);

  const play = useCallback(
    async (times = 2) => {
      if (playingRef.current) return;
      if (prefersReducedRef.current) {
        onSequenceEnd?.();
        return;
      }
      playingRef.current = true;
      for (let p = 0; p < times; p++) {
        await runOnePass();
        if (p < times - 1) {
          await new Promise((resolve) => {
            const t = setTimeout(resolve, passGap);
            timeoutsRef.current.push(t);
          });
        }
      }
      playingRef.current = false;
      onSequenceEnd?.();
    },
    [runOnePass, passGap, onSequenceEnd]
  );

  useImperativeHandle(ref, () => ({
    play,
    isPlaying: () => playingRef.current,
  }));

  useEffect(() => () => clearTimers(), []);

  return (
    <span
      className={className}
      aria-label={text}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {display.map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
});

export default AsciiTextSweep;
