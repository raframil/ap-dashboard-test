export function Footer() {
  return (
    <footer className="border-t border-portal bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-muted text-sm">
          Powered by the{" "}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover transition-colors"
          >
            Rick and Morty API
          </a>
        </p>
      </div>
    </footer>
  );
}
