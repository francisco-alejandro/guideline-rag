export const Footer = () => {
  return (
    <footer className="flex w-full sticky bottom-0 justify-center p-4">
      <p className="text-sm text-gray-600">
        Made with ❤️ by{" "}
        <a
          href="https://alejandro.jurado.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Alejandro Jurado
        </a>{" "}
        from Málaga
      </p>
    </footer>
  );
};
