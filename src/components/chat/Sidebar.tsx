import {
  Anchor,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  MessageSquarePlus,
  Network,
  Pencil,
  Settings,
  Shapes,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { didot } from "./fonts";

import type { Chat } from "./types";

type SidebarProps = {
  isCollapsed: boolean;
  chats: Chat[];
  newChatId: string | undefined;
  selectedChatId: string | undefined;
  onCollapse: () => void;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
  onDeleteChat: (id: string) => void;
};

export function Sidebar({
  isCollapsed,
  chats,
  newChatId,
  selectedChatId,
  onCollapse,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}: SidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string>();
  const [draftTitle, setDraftTitle] = useState("");

  const beginRename = (chat: Chat) => {
    setEditingChatId(chat.id);
    setDraftTitle(chat.title);
  };

  const saveRename = (chatId: string) => {
    onRenameChat(chatId, draftTitle.trim() || "New Chat");
    setEditingChatId(undefined);
  };

  return (
    <aside
      className={`relative flex shrink-0 flex-col overflow-hidden border-r border-white/15 bg-[var(--tide-accent)] py-3 text-white transition-[width,background-color] duration-300 ease-out max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-20 ${
        isCollapsed ? "w-[45.9px] px-1.5" : "w-[208.8px] px-2.5"
      }`}
    >
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between px-1.5"}`}>
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Anchor aria-hidden="true" className="size-4 shrink-0" strokeWidth={2.25} />
          {!isCollapsed && <span className={`${didot.className} text-[1.08rem] leading-none`}>Tide</span>}
        </div>
        {!isCollapsed && (
          <button type="button" onClick={onCollapse} aria-label="Collapse sidebar" className="sidebar-icon-button">
            <ChevronLeft aria-hidden="true" className="size-3.5" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button type="button" onClick={onCollapse} aria-label="Expand sidebar" className="sidebar-icon-button mx-auto mt-4">
          <ChevronRight aria-hidden="true" className="size-3.5" />
        </button>
      )}

      <div className="mt-6 space-y-0.5">
        <button type="button" onClick={onNewChat} className="sidebar-nav-button" title={isCollapsed ? "New chat" : undefined}>
          <MessageSquarePlus aria-hidden="true" className="size-3.5" />
          {!isCollapsed && "New chat"}
        </button>
        <button type="button" className="sidebar-nav-button" title={isCollapsed ? "Generate artifacts" : undefined}>
          <Shapes aria-hidden="true" className="size-3.5" />
          {!isCollapsed && "Generate artifacts"}
        </button>
        <button type="button" className="sidebar-nav-button" title={isCollapsed ? "Connections" : undefined}>
          <Network aria-hidden="true" className="size-3.5" />
          {!isCollapsed && "Connections"}
        </button>
        <button type="button" className="sidebar-nav-button" title={isCollapsed ? "Settings" : undefined}>
          <Settings aria-hidden="true" className="size-3.5" />
          {!isCollapsed && "Settings"}
        </button>
      </div>

      <nav aria-label="Chat history" className="sidebar-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto border-t border-white/15 pt-4">
        {!isCollapsed && <p className="px-2.5 pb-2 text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-white/55">Recent chats</p>}
        <ul className="space-y-0.5">
          {chats.map((chat) => (
            <li key={chat.id} className={`group flex items-center gap-0.5 ${chat.id === newChatId ? "motion-safe:animate-[chat-history-in_260ms_ease-out_both]" : ""}`}>
              {editingChatId === chat.id ? (
                <form
                  className="flex min-w-0 flex-1"
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveRename(chat.id);
                  }}
                >
                  <input
                    autoFocus
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    onBlur={() => saveRename(chat.id)}
                    aria-label="Chat title"
                    className="min-w-0 flex-1 rounded-md bg-white/20 px-3 py-1.5 text-[0.693rem] font-medium text-white outline-none ring-1 ring-inset ring-white/55"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  aria-current={selectedChatId === chat.id ? "page" : undefined}
                  title={isCollapsed ? chat.title : undefined}
                  className={`min-w-0 flex-1 truncate rounded-md px-3 py-2.5 text-left text-[0.693rem] font-medium transition-all duration-200 hover:translate-x-0.5 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    selectedChatId === chat.id ? "bg-white/20 font-semibold shadow-[inset_2px_0_0_rgb(255_255_255_/_0.9)]" : ""
                  } ${isCollapsed ? "text-center" : ""}`}
                >
                  {isCollapsed ? <span aria-hidden="true">•</span> : chat.title}
                </button>
              )}
              {!isCollapsed && editingChatId !== chat.id && (
                <span className="flex shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <button type="button" onClick={() => beginRename(chat)} aria-label={`Rename ${chat.title}`} className="sidebar-history-action">
                    <Pencil aria-hidden="true" className="size-3" />
                  </button>
                  <button type="button" onClick={() => onDeleteChat(chat.id)} aria-label={`Delete ${chat.title}`} className="sidebar-history-action">
                    <Trash2 aria-hidden="true" className="size-3" />
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="mt-3 border-t border-white/15 pt-2.5">
          <button type="button" className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-all duration-200 hover:scale-[1.01] hover:bg-white/10">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15"><CircleUserRound aria-hidden="true" className="size-4" /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.675rem] font-bold">Daniel Nguyen</span>
              <span className="block truncate text-[0.576rem] text-white/65">Free plan</span>
            </span>
            <span className="text-xs text-white/65">•••</span>
          </button>
        </div>
      )}
    </aside>
  );
}
