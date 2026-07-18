"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ChatWindow } from "@/components/chat/ChatWindow";
import { Composer } from "@/components/chat/Composer";
import { inter } from "@/components/chat/fonts";
import { Sidebar } from "@/components/chat/Sidebar";
import { ThemeToggle } from "@/components/chat/ThemeToggle";
import { models, type Chat, type Message, type Model } from "@/components/chat/types";

const mockStreamingResponse =
  "This is a mocked streaming response for the interface. In the finished app, Tide will use this space to give a clear, curriculum-aligned explanation of your Chemistry question.";

export default function ChatPage() {
  const [activeModel, setActiveModel] = useState<Model>(models[1]);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chats, setChats] = useState<Chat[]>([{ id: "chat-1", title: "New Chat", messages: [] }]);
  const [newChatId, setNewChatId] = useState<string>();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>("chat-1");
  const streamingTimerRef = useRef<number | undefined>(undefined);
  const messages = chats.find((chat) => chat.id === selectedChatId)?.messages ?? [];

  const surfaceClassName = isDark
    ? "bg-chat-dark text-slate-100"
    : "bg-chat-light text-slate-800";

  const clearMockResponse = () => {
    if (streamingTimerRef.current) window.clearInterval(streamingTimerRef.current);
    streamingTimerRef.current = undefined;
    setIsGenerating(false);
  };

  useEffect(() => () => {
    if (streamingTimerRef.current) window.clearInterval(streamingTimerRef.current);
  }, []);

  const startNewChat = () => {
    clearMockResponse();
    const chatId = `chat-${Date.now()}`;
    setChats((current) => [...current, { id: chatId, title: `New Chat${current.length ? ` ${current.length + 1}` : ""}`, messages: [] }]);
    setNewChatId(chatId);
    setSelectedChatId(chatId);
  };

  const handleSend = (prompt: string) => {
    if (isGenerating) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
    };
    const assistantMessageId = `assistant-${Date.now()}`;
    const chatId = selectedChatId ?? `chat-${Date.now()}`;

    setSelectedChatId(chatId);
    setIsGenerating(true);
    setChats((current) => {
      const responsePlaceholder: Message = { id: assistantMessageId, role: "assistant", content: "" };
      const selectedChat = current.find((chat) => chat.id === chatId);
      if (!selectedChat) {
        return [...current, { id: chatId, title: "New Chat", messages: [userMessage, responsePlaceholder] }];
      }

      return current.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, userMessage, responsePlaceholder] } : chat,
      );
    });

    let typedLength = 0;
    streamingTimerRef.current = window.setInterval(() => {
        typedLength = Math.min(typedLength + 3, mockStreamingResponse.length);
        const streamedContent = mockStreamingResponse.slice(0, typedLength);
        setChats((current) =>
          current.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((message) =>
                    message.id === assistantMessageId ? { ...message, content: streamedContent } : message,
                  ),
                }
              : chat,
          ),
        );

        if (typedLength === mockStreamingResponse.length) {
          if (streamingTimerRef.current) window.clearInterval(streamingTimerRef.current);
          streamingTimerRef.current = undefined;
          setIsGenerating(false);
        }
      }, 24);
  };

  const deleteChat = (chatId: string) => {
    clearMockResponse();
    const remainingChats = chats.filter((chat) => chat.id !== chatId);
    setChats(remainingChats);

    if (selectedChatId === chatId) {
      setSelectedChatId(remainingChats[0]?.id);
    }
  };

  return (
    <main
      className={`${inter.className} flex h-[100dvh] overflow-hidden transition-colors duration-300 ${surfaceClassName}`}
      style={{ "--tide-accent": activeModel.color } as CSSProperties}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        chats={chats}
        newChatId={newChatId}
        selectedChatId={selectedChatId}
        onCollapse={() => setIsSidebarCollapsed((current) => !current)}
        onNewChat={startNewChat}
        onSelectChat={(chatId) => {
          clearMockResponse();
          setSelectedChatId(chatId);
        }}
        onRenameChat={(chatId, title) =>
          setChats((current) =>
            current.map((chat) => (chat.id === chatId ? { ...chat, title } : chat)),
          )
        }
        onDeleteChat={deleteChat}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-end px-5 sm:px-7">
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark((current) => !current)} />
        </header>
        <ChatWindow isDark={isDark} isGenerating={isGenerating} messages={messages} />
        <div className="shrink-0 px-5 pb-5 pt-2.5 sm:px-7 sm:pb-6">
          <Composer activeModel={activeModel} isDark={isDark} isGenerating={isGenerating} onModelChange={setActiveModel} onSend={handleSend} />
        </div>
      </div>
    </main>
  );
}
