export function blockKeyboardShortcuts(overlayRef) {
  const handler = (e) => {
    const key = e.key?.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["s", "u", "p", "a", "c"].includes(key)) {
      e.preventDefault();
    }
    if (key === "printscreen") {
      e.preventDefault();
      if (overlayRef.current) {
        overlayRef.current.style.background = "#000";
        setTimeout(() => {
          if (overlayRef.current)
            overlayRef.current.style.background = "rgba(8,8,8,0.92)";
        }, 200);
      }
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}

export function renderCertificateToCanvas(canvasRef, src) {
  if (!src || !canvasRef.current) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  };
  img.src = src;
}
