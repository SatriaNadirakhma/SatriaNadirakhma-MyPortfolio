import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
import { useTheme } from "@context/ThemeContext";
import { useLenis } from "@context/LenisContext";
import logoBlue from "@assets/svg/nadi-blue-gradient.svg?url";
import logoWhite from "@assets/svg/nadi-white.svg?url";

// Same ramp fetch uses (config: shading=.,-~:;=!*#$@), light -> heavy.
// A leading space keeps fully-unlit areas blank instead of printing a dot.
const ASCII_CHARS = " .,-~:;=!*#$@";

// AsciiEffect creates its own internal <canvas> and calls getImageData() every
// frame (asciifyImage), which triggers Chrome's "willReadFrequently" perf
// warning. We can't pass that option to AsciiEffect directly, so patch canvas
// 2D context creation once, globally — purely a perf hint, no behavior change.
if (typeof window !== "undefined" && !HTMLCanvasElement.prototype.__willReadFrequentlyPatched) {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, options) {
    if (type === "2d") {
      return originalGetContext.call(this, type, { willReadFrequently: true, ...options });
    }
    return originalGetContext.call(this, type, options);
  };
  HTMLCanvasElement.prototype.__willReadFrequentlyPatched = true;
}

export default function Logo3D({ className = "" }) {
  const containerRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [failed, setFailed] = useState(false);
  const isVisibleRef = useRef(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const { lenis } = useLenis();

  // Pause during active scroll — biggest jank fix (Lenis vs AsciiEffect both rAF)
  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => { isScrollingRef.current = false; }, 120);
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [lenis]);

  // Only animate when in viewport — saves battery/FPS when hero is scrolled away
  // rootMargin -30% bottom stops earlier, before scroll velocity peaks
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0, rootMargin: "0px 0px -30% 0px" }
    );
    obs.observe(el);
    // Initially assume visible if already in viewport (hero is above fold)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) isVisibleRef.current = true;
    return () => obs.disconnect();
  }, []);

  // Keep group/material/effect refs so theme can update without rebuilding the whole scene
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let idleId = null;
    let frameId = null;
    let disposed = false;
    let lastTime = performance.now();
    let scene, camera, renderer, effect;

    const init = () => {
      if (disposed) return;
      setFailed(false);

      // AsciiEffect sizes its readback grid as floor(size * resolution) —
      // with resolution 0.18 any size below ~6px yields a 0 grid and the next
      // getImageData() throws IndexSizeError. Clamp so init can never poison
      // the grid; the real size is synced (and re-synced) by syncSize() below.
      const MIN_GRID = 8;
      const width = Math.max(container.clientWidth, MIN_GRID);
      const height = Math.max(container.clientHeight, MIN_GRID);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(32, width / height, 1, 5000);
      camera.position.z = 900;

      scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.4 : 0.55));
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(220, 320, 420);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
      fillLight.position.set(-200, -120, 180);
      scene.add(fillLight);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);

      // Lower resolution + fewer DOM nodes = major FPS win (was 0.22 → ~6.8k nodes, now 0.18 → ~4.6k)
      // alpha:true makes transparent background (alpha 0) render as invisible (opacity 0) instead of @@@
      effect = new AsciiEffect(renderer, ASCII_CHARS, {
        resolution: 0.18,
        scale: 1,
        color: true,
        alpha: true,
        invert: isDark,
      });
      effect.setSize(width, height);
      effect.domElement.style.color = isDark ? "#f5f7fb" : "#0055D4";
      effect.domElement.style.backgroundColor = "transparent";
      effect.domElement.style.width = "100%";
      effect.domElement.style.height = "100%";
      effect.domElement.style.overflow = "hidden";
      container.innerHTML = "";
      container.appendChild(effect.domElement);
      effectRef.current = effect;

      // Keeps renderer + ascii grid matched to the container. Degenerate
      // sizes are skipped instead of poisoning AsciiEffect, and layout
      // changes the window 'resize' event would miss get re-synced here.
      let lastW = 0;
      let lastH = 0;
      const syncSize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w < MIN_GRID || h < MIN_GRID) return false;
        if (w === lastW && h === lastH) return true;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        effect.setSize(w, h);
        lastW = w;
        lastH = h;
        return true;
      };
      syncSize();

      const url = isDark ? logoWhite : logoBlue;
      const color = isDark ? "#f5f7fb" : "#0055D4";

      new SVGLoader().load(
        url,
        (data) => {
          if (disposed) return;

          const built = new THREE.Group();
          const box = new THREE.Box3();
          const material = new THREE.MeshStandardMaterial({
            color,
            metalness: isDark ? 0.15 : 0.4,
            roughness: isDark ? 0.55 : 0.3,
            side: THREE.DoubleSide,
          });
          materialRef.current = material;

          data.paths.forEach((path) => {
            path.toShapes(true).forEach((shape) => {
              const geo = new THREE.ExtrudeGeometry(shape, {
                depth: 32,
                bevelEnabled: true,
                bevelThickness: 3,
                bevelSize: 2,
                bevelSegments: 2,
                curveSegments: 4,
              });
              geo.computeBoundingBox();
              box.union(geo.boundingBox);
              built.add(new THREE.Mesh(geo, material));
            });
          });

          const center = new THREE.Vector3();
          box.getCenter(center);
          built.children.forEach((mesh) => mesh.position.sub(center));
          built.rotation.x = Math.PI;

          const size = new THREE.Vector3();
          box.getSize(size);
          const fitRadius = size.length() / 2;
          const halfFovRad = THREE.MathUtils.degToRad(camera.fov / 2);
          camera.position.z = (fitRadius / Math.sin(halfFovRad)) * 1.25;

          scene.add(built);
          groupRef.current = built;
        },
        undefined,
        (err) => {
          console.error("[Logo3D] SVG load failed:", err);
          if (!disposed) setFailed(true);
        }
      );

      let lastFrame = performance.now();
      let consecutiveErrors = 0;
      const animate = () => {
        if (disposed) return;
        // Schedule the next frame FIRST — a throw below must never kill the loop
        frameId = requestAnimationFrame(animate);
        // Pause when not visible, tab hidden, or actively scrolling — saves FPS
        // Fixes jank when Lenis smooth-scroll and AsciiEffect both hit rAF
        if (!isVisibleRef.current || document.hidden || isScrollingRef.current) return;
        // Throttle to ~30fps for AsciiEffect (DOM-heavy)
        const now = performance.now();
        if (now - lastFrame < 1000 / 30) return;
        lastFrame = now;
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (groupRef.current) {
          groupRef.current.rotation.x += delta * 0.22;
          groupRef.current.rotation.y += delta * 0.28;
        }

        // Skip frames while the container has (almost) no layout — rendering
        // then would read a 0-size grid and throw IndexSizeError.
        if (!syncSize()) return;

        try {
          effect.render(scene, camera);
          consecutiveErrors = 0;
        } catch (err) {
          consecutiveErrors += 1;
          if (consecutiveErrors === 1) console.warn("[Logo3D] frame render failed, retrying:", err);
          if (consecutiveErrors > 60) {
            // Persistent failure (~2s) — stop looping and show the fallback
            // UI instead of throwing on every frame.
            cancelAnimationFrame(frameId);
            frameId = null;
            if (!disposed) setFailed(true);
          }
        }
      };
      animate();

      const handleResize = () => {
        syncSize();
      };
      window.addEventListener("resize", handleResize);

      // Store for cleanup
      init.cleanup = () => {
        window.removeEventListener("resize", handleResize);
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) obj.material.dispose();
        });
        renderer.dispose();
        container.innerHTML = "";
      };
    };

    // Defer heavy Three.js work until browser is idle and loader has finished
    // — keeps matrix loader + LCP smooth at 60fps. Also respect reduced motion.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Still init but don't animate — show static
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(init, { timeout: 2000 });
      } else {
        idleId = setTimeout(init, 300);
      }
    } else {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(init, { timeout: 1500 });
      } else {
        idleId = setTimeout(init, 400);
      }
    }

    return () => {
      disposed = true;
      if (idleId) {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      }
      if (frameId) cancelAnimationFrame(frameId);
      if (init.cleanup) init.cleanup();
      else {
        // Fallback cleanup if init never ran
        container.innerHTML = "";
      }
    };
  }, []);

  // Theme switch without rebuilding — keeps rotation, just swaps colors
  useEffect(() => {
    if (groupRef.current && materialRef.current) {
      const newColor = isDark ? "#f5f7fb" : "#0055D4";
      materialRef.current.color.set(newColor);
      materialRef.current.metalness = isDark ? 0.15 : 0.4;
      materialRef.current.roughness = isDark ? 0.55 : 0.3;
      materialRef.current.needsUpdate = true;
    }
    if (effectRef.current) {
      effectRef.current.domElement.style.color = isDark ? "#f5f7fb" : "#0055D4";
      // AsciiEffect invert is set at creation; update via style filter as fallback
      // and also try to set the internal flag if available
      try {
        effectRef.current.invert = isDark;
      } catch {
        // invert flag is best-effort (AsciiEffect internal) — style color above already applied
      }
    }
  }, [isDark]);

  return (
    <div className={`relative w-full aspect-square ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-red-500 text-center px-4">
          Logo 3D gagal dimuat — cek console.
        </div>
      )}
    </div>
  );
}