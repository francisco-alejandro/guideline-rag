interface BubbleProps {
  variant: "primary" | "outline";
  content: string;
}

const getVariant = (variant: "primary" | "outline") => {
  const base = "max-w-xs lg:max-w-md px-4 py-2 rounded-lg";

  if (variant === "primary") {
    return `${base} bg-black text-white rounded-br-none`;
  }

  return `${base} bg-white text-black border-black border rounded-bl-none`;
};

export const Bubble = ({ variant, content }: BubbleProps) => {
  const styles = getVariant(variant);

  return (
    <div
      className={`flex ${variant === "primary" ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={styles}>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};
