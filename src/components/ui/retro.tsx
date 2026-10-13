import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import { STATUS_LABEL, type ModelStatus } from "@/lib/catalog";

export function RetroButton({
  tone = "ghost",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "primary" | "ghost" }) {
  return (
    <button
      type={type}
      className={cn("retro-btn", tone === "primary" && "retro-btn-primary", className)}
      {...props}
    />
  );
}

export function RetroLink({
  to,
  tone = "ghost",
  className,
  children,
}: {
  to:
    | "/"
    | "/chat"
    | "/code"
    | "/images"
    | "/videos"
    | "/audio"
    | "/models"
    | "/history"
    | "/credits"
    | "/settings"
    | "/login";
  tone?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn("retro-btn", tone === "primary" && "retro-btn-primary", className)}>
      {children}
    </Link>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block font-sans text-xs font-medium tracking-wide text-muted uppercase">{children}</span>;
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("retro-field", props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("retro-field", props.className)} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("retro-field", props.className)} />;
}

export function Panel({
  kicker,
  children,
  className,
  bodyClassName,
}: {
  kicker?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("window-enter border border-line bg-surface", className)}>
      {kicker ? (
        <header className="flex items-center gap-2 border-b border-line bg-panel px-3 py-2">
          <span className="size-2 bg-violet" aria-hidden />
          <h2 className="font-pixel text-micro text-ink">{kicker}</h2>
        </header>
      ) : null}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </section>
  );
}

export function PageHeader({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <header className="mb-6 max-w-2xl">
      <p className="font-pixel text-micro text-muted">{kicker}</p>
      <h1 className="mt-2 font-display text-3xl leading-display text-ink md:text-4xl">{title}</h1>
      {lede ? <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{lede}</p> : null}
    </header>
  );
}

export function StatusBadge({ status }: { status: ModelStatus }) {
  return (
    <span className="inline-flex items-center gap-2 border border-line bg-surface px-2 py-1 text-xs text-ink">
      <span
        className={cn(
          "size-2",
          status === "disponible" && "bg-pixel",
          status === "premium" && "bg-violet",
          status === "non-configure" && "bg-panel",
        )}
        aria-hidden
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="border border-line bg-violet-soft px-3 py-2 text-sm leading-relaxed text-ink">
      {children}
    </p>
  );
}

export function PixelWait({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <span className="pixel-wait" aria-hidden>
        <i />
        <i />
        <i />
      </span>
      {label}
    </span>
  );
}

export function ScrollPage({ children }: { children: ReactNode }) {
  return <div className="page-enter h-full overflow-y-auto px-4 py-6 md:px-8 md:py-8">{children}</div>;
}
