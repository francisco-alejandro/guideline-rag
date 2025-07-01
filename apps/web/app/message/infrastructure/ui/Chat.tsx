"use client";
import { Button, Textarea, Bubble } from "@repo/ui/components";
import { useCreateMessage } from "../hooks";
import { useChat } from "../context";
import { Message } from "../../domain";
import { useRef, useEffect } from "react";

const Chat = () => {
  const { mutate: createMessage, isPending } = useCreateMessage();
  const { messages, addMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = formData.get("content") as string;

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      chatId: "temp",
      turnId: "temp",
      content: content,
    };

    addMessage(userMessage);

    form.reset();

    createMessage(content, {
      onSuccess: (assistantMessage: Message) => {
        addMessage(assistantMessage);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {messages.length === 0 ? (
        <div className="flex flex-col gap-4 p-4 justify-center items-center">
          <h1 className="text-xl font-bold">What do you want to build?</h1>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden">
          <div className="flex flex-col h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <Bubble
                key={message.id}
                variant={message.role === "user" ? "primary" : "outline"}
                content={message.content}
                highlight={message.role === "assistant"}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-4 justify-center items-center">
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Describe your function"
            name="content"
            id="content"
            disabled={isPending}
          />
          <div className="flex w-full justify-end">
            <Button variant="primary" type="submit" disabled={isPending}>
              {isPending ? "Generating..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Chat };
