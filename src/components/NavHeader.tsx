function NavHeader({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div className="hover:cursor-pointer">
      <h1
        className={`hidden xs:flex ${menuOpen ? "text-white" : "text-primary"}`}
      >
        Ola Lømo Ellingsen
      </h1>
      <h2
        className={`xs:hidden font-normal ${
          menuOpen ? "text-white" : "text-primary"
        }`}
      >
        Ola Lømo Ellingsen
      </h2>
      <h3 className={`font-thin text-sm ${menuOpen ? "text-white" : ""}`}>
        Trumpet player | Composer
      </h3>
    </div>
  );
}

export default NavHeader;
