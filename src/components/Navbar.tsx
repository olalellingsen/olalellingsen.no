import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import SoMe from "./SoMe";
import NavHeader from "./NavHeader";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems] = useState([
    { label: "Home", path: "/home" },
    { label: "Projects", path: "/projects" },
    { label: "Music", path: "/music" },
    { label: "Calendar", path: "/calendar" },
  ]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="fixed h-16 xs:h-20 sm:h-24 p-2 xs:p-4 sm:px-6 flex justify-between w-full lightTheme">
        <div className="flex">
          <Link to="/home">
            <NavHeader menuOpen={false} />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 p-4 text-lg">
          {menuItems.map((item) => (
            <Link to={item.path} className="navLink" key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={50} strokeWidth={1} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed md:hidden top-0 left-0 w-screen h-screen bg-primary">
          {/* logo and cross */}
          <div className="h-20 sm:h-24 p-2 xs:p-4 flex justify-between w-full">
            <NavHeader menuOpen={true} />
            <div className="flex justify-end">
              <X
                size={50}
                strokeWidth={1}
                className="stroke-white"
                onClick={closeMenu}
              />
            </div>
          </div>

          {/* menu on mobile */}
          <ul className="p-2 xs:p-4 text-4xl text-white grid gap-3 w-min">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:underline"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </ul>

          <div className="absolute bottom-4 w-full px-4 xs:px-8 sm:px-20">
            <div className="flex justify-between gap-2">
              <SoMe face={true} size={50} />
              <SoMe insta={true} size={50} />
              <SoMe linkedin={true} size={50} />
              <SoMe spotify={true} size={50} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
