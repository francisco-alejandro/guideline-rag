"use client";
import { Button, Textarea } from "@repo/ui/components";
import { useCreateMessage } from "../hooks";

const Chat = () => {
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content") as string;

    createMessage(content);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <Textarea
        placeholder="Describe your function"
        name="content"
        id="content"
      />
      <div className="flex w-full justify-end">
        <Button variant="primary" type="submit">
          Click me
        </Button>
      </div>
    </form>
  );
};

export { Chat };
