"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chat, Layout } from "./message/infrastructure";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full min-h-screen flex-col justify-between items-center">
        <main className="flex flex-col w-full max-w-screen-md p-4">
          <Layout>
            <h1 className="text-2xl font-bold w-full text-center">
              What do you want to build?
            </h1>
            <Chat />
          </Layout>
        </main>
        <footer className="flex w-full sticky bottom-0 justify-center p-4">
          <p className="text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://alejandro.jurado.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Alejandro
            </a>{" "}
            from Málaga
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
