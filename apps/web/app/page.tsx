import { Button, Textarea } from "@repo/ui/components";
import { Chat, Layout } from "./message/infrastructure";

const Form = () => {
  return (
    <form className="flex flex-col gap-4 w-full">
      <Textarea placeholder="Describe your function" />
      <div className="flex w-full justify-end">
        <Button variant="primary">Click me</Button>
      </div>
    </form>
  );
};

export default function Home() {
  return (
    <div className="flex w-full min-h-screen flex-col justify-between items-center">
      <main className="flex flex-col w-full max-w-screen-md p-4">
        <Layout>
          <Chat />
        </Layout>
        <div className="flex flex-col justify-center items-center gap-4 mt-16 sm:mt-64">
          <h1 className="text-2xl font-bold w-full text-center">
            What do you want to build?
          </h1>
          <Form />
        </div>
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
  );
}
