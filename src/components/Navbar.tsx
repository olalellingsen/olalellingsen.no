import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import SoMe from "./SoMe";
import NavHeader from "./NavHeader";
import { useMenuContext } from "../context/MenuContext";

function Navbar() {
  const { isOpen, openMenu, closeMenu } = useMenuContext();
  const location = useLocation();

  const whiteNavbar = useState(location.pathname === "/");

  const [menuItems] = useState([
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Music", path: "/music" },
    { label: "Calendar", path: "/calendar" },
  ]);

  return (
    <>
      <nav className="absolute h-16 sm:h-20 p-2 sm:px-4 flex justify-between w-full">
        <div className={`flex ${whiteNavbar ? "text-stone-200" : ""}`}>
          <Link to="/">
            <NavHeader />
          </Link>
        </div>
        <div
          className={`hidden sm:flex gap-8 m-4 text-lg hover:text-stone-400 ${
            whiteNavbar ? "text-stone-200" : ""
          } `}
        >
          {menuItems.map((item) => (
            <Link
              to={item.path}
              className={`${whiteNavbar ? "navLinkWhite" : "navLink"}`}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="sm:hidden" onClick={openMenu}>
          <Menu
            size={50}
            strokeWidth={1}
            className={`${
              whiteNavbar ? "stroke-stone-200" : "stroke-stone-800"
            }`}
          />
        </div>
      </nav>
      {isOpen && (
        <div className="fixed md:hidden top-0 left-0 w-screen h-screen lightTheme">
          {/* logo and cross */}
          <div className="h-20 sm:h-24 p-2 flex justify-between w-full">
            <NavHeader />
            <div className="flex justify-end">
              <X size={50} strokeWidth={1} onClick={closeMenu} />
            </div>
          </div>

          {/* menu on mobile */}
          <ul className="text-4xl grid gap-4 text-center mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:font-medium"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </ul>

          <div className="absolute bottom-4 w-full px-4 xs:px-8 sm:px-20">
            <div className="flex justify-between gap-2">
              <SoMe face={true} size={40} />
              <SoMe insta={true} size={40} />
              <SoMe spotify={true} size={40} />
              <SoMe apple_music={true} size={40} />
              <SoMe yt={true} size={40} />
              <SoMe linkedin={true} size={40} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
