import { ChevronDown } from "lucide-react";

import { models, type Model } from "./types";

type ModelSelectorProps = {
  activeModel: Model;
  isDark: boolean;
  onModelChange: (model: Model) => void;
};

export function ModelSelector({ activeModel, isDark, onModelChange }: ModelSelectorProps) {
  return (
    <label className="relative shrink-0">
      <span className="sr-only">Select model</span>
      <select
        value={activeModel.id}
        onChange={(event) => {
          const selectedModel = models.find((model) => model.id === event.target.value);
          if (selectedModel) onModelChange(selectedModel);
        }}
        className={`h-8 appearance-none rounded-md border py-1 pl-2.5 pr-7 text-[0.648rem] font-bold outline-none transition-colors ${
          isDark
            ? "border-white/10 bg-composer-dark text-slate-100 hover:border-white/25"
            : "border-black/10 bg-white text-slate-700 hover:border-black/20"
        } focus-visible:border-[var(--tide-accent)]`}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.emoji} {model.name}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className={`pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 ${
          isDark ? "text-slate-300" : "text-slate-500"
        }`}
      />
    </label>
  );
}
