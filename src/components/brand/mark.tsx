export function MosaicMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect width="16" height="16" fill="#F7F6F0" />
      <rect x="1" y="1" width="4" height="4" fill="#7957D5" />
      <rect x="6" y="1" width="4" height="4" fill="#A6CF72" />
      <rect x="11" y="1" width="4" height="4" fill="#242321" />
      <rect x="1" y="6" width="4" height="4" fill="#242321" />
      <rect x="6" y="6" width="4" height="4" fill="#7957D5" />
      <rect x="11" y="6" width="4" height="4" fill="#A6CF72" />
      <rect x="1" y="11" width="4" height="4" fill="#A6CF72" />
      <rect x="6" y="11" width="4" height="4" fill="#292821" />
      <rect x="11" y="11" width="4" height="4" fill="#7957D5" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <MosaicMark />
      <span className="font-display text-base leading-none tracking-wide text-ink sm:text-xl">MOSAÏUM</span>
      <span className="font-pixel text-micro text-violet">AI</span>
    </span>
  );
}
