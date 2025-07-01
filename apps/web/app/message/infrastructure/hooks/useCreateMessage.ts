import { useMutation } from "@tanstack/react-query";
import { MessageCreateUseCase } from "../../domain";
import { useProvider } from "./useProvider";

export const useCreateMessage = () => {
  const messageCreateUseCase =
    useProvider<MessageCreateUseCase>("message.create");

  return useMutation({
    mutationFn: (content: string) => messageCreateUseCase.execute(content),
  });
};
