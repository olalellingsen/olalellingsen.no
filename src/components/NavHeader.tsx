function NavHeader({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div className="hover:cursor-pointer">
      <h1
        className={`hidden sm:flex ${menuOpen ? "text-white" : "text-primary"}`}
      >
        Ola Lømo Ellingsen
      </h1>
      <h2
        className={`sm:hidden p-0 ${menuOpen ? "text-white" : "text-primary"}`}
      >
        Ola Lømo Ellingsen
      </h2>
      <h3 className={`p-0 text-sm ${menuOpen ? "text-white" : ""}`}>
        Trumpet player | Composer
      </h3>
    </div>
  );
}

export default NavHeader;
