import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={onToggle}
      className={`relative flex size-8 items-center justify-center rounded-md border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tide-accent)] ${
        isDark
          ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          : "border-black/10 bg-white/60 text-slate-700 hover:bg-white"
      }`}
    >
      <Sun
        aria-hidden="true"
        className={`absolute size-4 transition-all duration-200 ${isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-4 transition-all duration-200 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"}`}
      />
    </button>
  );
}
