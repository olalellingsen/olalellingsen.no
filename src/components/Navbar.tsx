import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import SoMe from "./SoMe";
import NavHeader from "./NavHeader";
import { useMenuContext } from "../context/MenuContext";

function Navbar() {
  const { isOpen, openMenu, closeMenu } = useMenuContext();

  const [menuItems] = useState([
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Music", path: "/music" },
    { label: "Calendar", path: "/calendar" },
  ]);

  return (
    <>
      <nav className="absolute h-16 sm:h-20 p-2 sm:px-4 flex justify-between w-full">
        <div className="flex">
          <Link to="/">
            <NavHeader menuOpen={false} />
          </Link>
        </div>
        <div className="hidden sm:flex gap-8 p-4 text-lg hover:text-slate-400">
          {menuItems.map((item) => (
            <Link to={item.path} className="navLink" key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="sm:hidden" onClick={openMenu}>
          <Menu size={50} strokeWidth={1} />
        </div>
      </nav>
      {isOpen && (
        <div className="fixed md:hidden top-0 left-0 w-screen h-screen darkTheme">
          {/* logo and cross */}
          <div className="h-20 sm:h-24 p-2 flex justify-between w-full">
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
          <ul className="px-8 text-4xl text-white grid gap-3 w-min">
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
