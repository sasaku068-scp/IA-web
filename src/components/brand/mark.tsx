export function MosaicMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <rect width="16" height="16" rx="3" fill="#EAF2FF" />
      <rect x="1.2" y="1.2" width="5.2" height="5.2" rx="1.2" fill="#2B6EF6" />
      <rect x="7.6" y="1.2" width="4.2" height="5.2" rx="1.2" fill="#8ABEFF" />
      <rect x="11.2" y="1.2" width="4.6" height="5.2" rx="1.2" fill="#0F1724" />
      <rect x="1.2" y="7.2" width="4.6" height="4.2" rx="1.2" fill="#0F1724" />
      <rect x="6.6" y="7.2" width="5.2" height="4.2" rx="1.2" fill="#7EA8FF" />
      <rect x="11.2" y="7.2" width="4.6" height="4.2" rx="1.2" fill="#CFE6FF" />
      <rect x="1.2" y="11.6" width="5.2" height="3.2" rx="1.2" fill="#A9D6C9" />
      <rect x="7.6" y="11.6" width="4.2" height="3.2" rx="1.2" fill="#0F1724" />
      <rect x="11.2" y="11.6" width="4.6" height="3.2" rx="1.2" fill="#2B6EF6" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <MosaicMark />
      <span className="text-base font-semibold tracking-[-0.02em] text-ink sm:text-xl">SASAKU</span>
      <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
        AI
      </span>
    </span>
  );
}
