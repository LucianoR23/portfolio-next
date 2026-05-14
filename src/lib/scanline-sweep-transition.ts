const DURATION = 600;
const STYLE_ID = "scanline-sweep-styles";
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

type PopoverElement = HTMLElement & {
  showPopover?: () => void;
  hidePopover?: () => void;
};

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(root) {
  animation: scanline-vt-reveal ${DURATION}ms ${EASING} forwards;
  mix-blend-mode: normal;
}
@keyframes scanline-vt-reveal {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0 0); }
}

.scanline-sweep-overlay {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  cursor: progress;
}

.scanline-sweep-overlay .scanline-line {
  position: absolute;
  left: 0;
  right: 0;
  top: -2px;
  height: 2px;
  background: var(--primary);
  box-shadow:
    0 0 6px var(--primary),
    0 0 14px var(--primary),
    0 -2px 8px color-mix(in srgb, var(--primary) 60%, transparent);
  animation: scanline-line-move ${DURATION}ms ${EASING} forwards;
  will-change: transform, opacity;
}

.scanline-sweep-overlay .scanline-glow {
  position: absolute;
  left: 0;
  right: 0;
  top: -32px;
  height: 32px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    color-mix(in srgb, var(--primary) 8%, transparent) 60%,
    color-mix(in srgb, var(--primary) 18%, transparent) 100%
  );
  animation: scanline-line-move ${DURATION}ms ${EASING} forwards;
  will-change: transform;
  pointer-events: none;
}

@keyframes scanline-line-move {
  0%   { transform: translateY(0); opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateY(calc(100vh + 4px)); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
  .scanline-sweep-overlay .scanline-line,
  .scanline-sweep-overlay .scanline-glow {
    animation: none;
  }
}
`;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export function scanlineSweepTransition(callback: () => void) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    callback();
    return;
  }

  const doc = document as DocumentWithVT;
  const supportsVT = typeof doc.startViewTransition === "function";
  const supportsPopover =
    typeof HTMLElement !== "undefined" &&
    typeof (HTMLElement.prototype as PopoverElement).showPopover === "function";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!supportsVT || !supportsPopover || reduced) {
    callback();
    return;
  }

  injectStyles();

  const overlay = document.createElement("div") as PopoverElement;
  overlay.setAttribute("popover", "manual");
  overlay.className = "scanline-sweep-overlay";

  const glow = document.createElement("div");
  glow.className = "scanline-glow";
  overlay.appendChild(glow);

  const line = document.createElement("div");
  line.className = "scanline-line";
  overlay.appendChild(line);

  const cleanup = () => {
    try {
      overlay.hidePopover?.();
    } catch {}
    overlay.remove();
  };

  const transition = doc.startViewTransition!(() => {
    callback();
  });

  transition.ready
    .then(() => {
      document.body.appendChild(overlay);
      try {
        overlay.showPopover?.();
      } catch {
        cleanup();
        return;
      }

      transition.finished
        .then(() => {
          setTimeout(cleanup, 50);
        })
        .catch(() => {
          cleanup();
        });
    })
    .catch(() => {
      cleanup();
    });
}
