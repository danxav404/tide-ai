import { FlaskConical, ShipWheel } from "lucide-react";

import { didot } from "./fonts";
import type { Message } from "./types";

type ChatWindowProps = {
  isDark: boolean;
  isGenerating: boolean;
  messages: Message[];
};

export function ChatWindow({ isDark, isGenerating, messages }: ChatWindowProps) {
  if (messages.length === 0) {
    return (
      <section className={`${didot.className} flex flex-1 items-center justify-center px-5`}>
        <div className="max-w-sm text-center">
          <div
            className={`mx-auto mb-3 flex size-9 items-center justify-center rounded-full ${
              isDark ? "bg-white/10 text-slate-200" : "bg-[color-mix(in_srgb,var(--tide-accent)_12%,transparent)] text-[var(--tide-accent)]"
            }`}
          >
            <FlaskConical aria-hidden="true" className="size-[1.1rem]" />
          </div>
          <h1 className="text-[1.215rem] leading-tight">What are you working on?</h1>
          <p className={`mt-2 text-[0.855rem] leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Ask Tide about a VCE Chemistry concept, calculation, or practice question.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Conversation" className={`chat-scrollbar ${didot.className} flex-1 overflow-y-auto px-5 pb-7 pt-8 sm:px-8 sm:pt-10`}>
      <div className="mx-auto max-w-[44rem] space-y-8">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`${message.role === "user" ? "ml-auto flex max-w-[37rem] flex-col items-end motion-safe:animate-[user-message-in_260ms_ease-out_both]" : "max-w-none motion-safe:animate-[assistant-message-in_260ms_ease-out_both]"}`}
          >
            {message.role === "user" ? (
              <p className={`mb-1.5 text-right text-[0.576rem] font-semibold uppercase tracking-[0.12em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                You
              </p>
            ) : (
              <div className={`mb-2 flex items-center gap-1.5 text-[0.657rem] font-semibold uppercase tracking-[0.14em] ${isDark ? "text-sky-200" : "text-[var(--tide-accent)]"}`}>
                <ShipWheel aria-hidden="true" className="size-4" strokeWidth={2.25} />
                Tide
              </div>
            )}
            <div
              className={`break-words [overflow-wrap:anywhere] text-[0.81rem] leading-7 sm:text-[0.8775rem] ${
                message.role === "user"
                  ? `w-fit max-w-full rounded-xl px-3.5 py-3 sm:px-4 ${isDark ? "bg-white/10 text-slate-100" : "bg-chat-user-light text-slate-800"}`
                  : isDark
                    ? "text-slate-100"
                    : "text-slate-800"
              }`}
            >
              {message.content}
              {message.role === "assistant" && isGenerating && message.id === messages.at(-1)?.id && (
                <span aria-label="Tide is typing" className={`ml-1 inline-block h-5 w-0.5 translate-y-1 animate-pulse ${isDark ? "bg-sky-200" : "bg-[var(--tide-accent)]"}`} />
              )}
            </div>
          </article>
        ))}
        <div className="flex justify-start pt-2" aria-label={isGenerating ? "Tide is generating" : "Tide response complete"}>
          <span className={`flex size-12 items-center justify-center rounded-full ${isDark ? "bg-white/8 text-slate-300" : "bg-[color-mix(in_srgb,var(--tide-accent)_10%,transparent)] text-[var(--tide-accent)]"}`}>
            <ShipWheel aria-hidden="true" className={`size-[1.35rem] ${isGenerating ? "animate-[signoff-pulse_1.8s_ease-in-out_infinite]" : ""}`} strokeWidth={2.1} />
          </span>
        </div>
      </div>
    </section>
  );
}
