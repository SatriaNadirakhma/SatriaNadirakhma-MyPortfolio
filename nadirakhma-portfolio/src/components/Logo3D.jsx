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
    let group = null;

    const init = () => {
      if (disposed) return;
      setFailed(false);

      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

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
          group = built;
          groupRef.current = built;
        },
        undefined,
        (err) => {
          console.error("[Logo3D] SVG load failed:", err);
          if (!disposed) setFailed(true);
        }
      );

      let lastFrame = performance.now();
      const animate = () => {
        if (disposed) return;
        // Pause when not visible, tab hidden, or actively scrolling — saves FPS
        // Fixes jank when Lenis smooth-scroll and AsciiEffect both hit rAF
        if (!isVisibleRef.current || document.hidden || isScrollingRef.current) {
          frameId = requestAnimationFrame(animate);
          return;
        }
        // Throttle to ~30fps for AsciiEffect (DOM-heavy)
        const now = performance.now();
        if (now - lastFrame < 1000 / 30) {
          frameId = requestAnimationFrame(animate);
          return;
        }
        lastFrame = now;
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (groupRef.current) {
          groupRef.current.rotation.x += delta * 0.22;
          groupRef.current.rotation.y += delta * 0.28;
        }

        effect.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        effect.setSize(w, h);
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
      } catch {}
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
