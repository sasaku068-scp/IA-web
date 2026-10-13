import type { PixelIconName } from "@/components/pixel/icons";

export const NAV = [
  { to: "/", label: "Accueil", icon: "home" },
  { to: "/chat", label: "Chat IA", icon: "chat" },
  { to: "/code", label: "Code", icon: "code" },
  { to: "/images", label: "Images", icon: "image" },
  { to: "/videos", label: "Vidéos", icon: "video" },
  { to: "/audio", label: "Audio", icon: "audio" },
  { to: "/models", label: "Modèles", icon: "models" },
  { to: "/history", label: "Historique", icon: "history" },
  { to: "/credits", label: "Crédits", icon: "credits" },
  { to: "/settings", label: "Paramètres", icon: "settings" },
] as const;

export type NavPath = (typeof NAV)[number]["to"];

export function sectionLabel(pathname: string): string {
  const match = NAV.find((item) => (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)));
  return match?.label ?? "MOSAÏUM";
}

export function iconFor(pathname: string): PixelIconName {
  const match = NAV.find((item) => (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)));
  return match?.icon ?? "home";
}
