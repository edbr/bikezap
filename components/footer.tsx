export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 text-center text-sm text-muted-foreground bg-background fixed bottom-0 left-0">
      <p>
        Built by{" "}
        <a
          href="https://edbelluti.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          Eduardo Belluti
        </a>{" "}
        — 2025
      </p>
    </footer>
  );
}
