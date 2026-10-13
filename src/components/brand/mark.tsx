export function MosaicMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect width="16" height="16" rx="4" fill="#F5F0FF" />
      <rect x="1" y="1" width="5" height="5" rx="1.2" fill="#5B6CF7" />
      <rect x="7" y="1" width="4" height="5" rx="1.2" fill="#BFE5DB" />
      <rect x="11" y="1" width="4" height="5" rx="1.2" fill="#1A1C1F" />
      <rect x="1" y="7" width="4" height="4" rx="1.2" fill="#1A1C1F" />
      <rect x="6" y="7" width="5" height="4" rx="1.2" fill="#8A8EF3" />
      <rect x="11" y="7" width="4" height="4" rx="1.2" fill="#C8D4FF" />
      <rect x="1" y="11" width="5" height="4" rx="1.2" fill="#A9D6C9" />
      <rect x="7" y="11" width="4" height="4" rx="1.2" fill="#1A1C1F" />
      <rect x="11" y="11" width="4" height="4" rx="1.2" fill="#5B6CF7" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <MosaicMark />
      <span className="text-base font-semibold tracking-[-0.04em] text-ink sm:text-xl">SASAKU</span>
      <span className="rounded-full border border-line bg-primary-soft px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-primary uppercase">
        AI
      </span>
    </span>
  );
}
