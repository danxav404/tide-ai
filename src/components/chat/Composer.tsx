import { Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";

import { ModelSelector } from "./ModelSelector";
import type { Model } from "./types";

type ComposerProps = {
  activeModel: Model;
  isDark: boolean;
  isGenerating: boolean;
  onModelChange: (model: Model) => void;
  onSend: (prompt: string) => void;
};

export function Composer({ activeModel, isDark, isGenerating, onModelChange, onSend }: ComposerProps) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
  }

  function submitPrompt() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isGenerating) return;

    onSend(trimmedPrompt);
    setPrompt("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "32px";
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submitPrompt();
      }}
      className={`mx-auto flex w-full max-w-[44rem] items-end gap-2 rounded-lg border p-2.5 transition-[border-color,box-shadow,background-color] duration-200 focus-within:shadow-[0_5px_15px_rgb(15_23_42_/_0.07)] ${
        isDark
          ? "border-white/10 bg-composer-dark focus-within:border-white/25 focus-within:shadow-black/20"
          : "border-black/10 bg-white focus-within:border-[color-mix(in_srgb,var(--tide-accent)_48%,black)]"
      }`}
    >
      <button
        type="button"
        aria-label="Attach a file"
        className={`flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-ocean ${
          isDark
            ? "text-slate-500 hover:bg-white/10 hover:text-white"
            : "text-slate-400 hover:bg-black/5 hover:text-slate-700"
        }`}
      >
        <Paperclip aria-hidden="true" className="size-4" />
      </button>
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(event) => {
          setPrompt(event.target.value);
          resizeTextarea(event.currentTarget);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;

          event.preventDefault();
          submitPrompt();
        }}
        rows={1}
        wrap="soft"
        placeholder="Ask a Chemistry question…"
        className={`max-h-36 min-h-8 min-w-0 flex-1 resize-none overflow-y-auto break-all bg-transparent py-1.5 text-[0.7425rem] leading-6 outline-none transition-[height] duration-200 ease-out ${
          isDark ? "text-slate-100 placeholder:text-slate-500" : "text-slate-800 placeholder:text-slate-400"
        }`}
      />
      <ModelSelector activeModel={activeModel} isDark={isDark} onModelChange={onModelChange} />
      <button
        type="submit"
        aria-label="Send message"
        disabled={!prompt.trim() || isGenerating}
        className="accent-button flex size-8 shrink-0 items-center justify-center rounded-md text-white transition-all duration-200 hover:scale-[1.04] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tide-accent)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
      >
        <Send aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
