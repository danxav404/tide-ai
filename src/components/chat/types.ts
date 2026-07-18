export const models = [
  { id: "sardine", name: "Sardine", emoji: "🐟", color: "#5B7891" },
  { id: "shark", name: "Shark", emoji: "🦈", color: "#1C5A78" },
  { id: "whale", name: "Whale", emoji: "🐋", color: "#123347" },
  { id: "kraken", name: "Kraken", emoji: "🐙", color: "#08151F" },
] as const;

export type Model = (typeof models)[number];

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
