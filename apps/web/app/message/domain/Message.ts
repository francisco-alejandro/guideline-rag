export type Role = "user" | "assistant";

export type Message = {
  id: string;
  role: Role;
  chatId: string;
  turnId: string;
  content: string;
};
