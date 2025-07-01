import React from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";

const SyntaxHighlighter =
  Prism as typeof React.Component<SyntaxHighlighterProps>;

interface BubbleProps {
  variant: "primary" | "outline";
  highlight: boolean;
  content: string;
}

const getVariant = (variant: "primary" | "outline") => {
  const base = "px-4 py-2 rounded-lg";

  if (variant === "primary") {
    return `${base} max-w-xs lg:max-w-md bg-black text-white rounded-br-none`;
  }

  return `${base} w-fullbg-white text-black border-black border rounded-bl-none`;
};

export const Bubble = ({ variant, content, highlight }: BubbleProps) => {
  const styles = getVariant(variant);

  return (
    <div
      className={`flex ${variant === "primary" ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={styles}>
        {highlight ? (
          <SyntaxHighlighter language="python">{content}</SyntaxHighlighter>
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>
    </div>
  );
};
