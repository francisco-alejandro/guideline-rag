"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Chat,
  ChatProvider,
  DependenciesProvider,
} from "./message/infrastructure";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DependenciesProvider>
        <ChatProvider>
          <Chat />
        </ChatProvider>
      </DependenciesProvider>
    </QueryClientProvider>
  );
}
