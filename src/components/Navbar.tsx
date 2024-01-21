import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

import { Link } from "react-scroll";
import SoMe from "./SoMe";
import NavHeader from "./NavHeader";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function clickLink() {
    setTimeout(() => {
      closeMenu();
    }, 200); // Replace 1000 with the number of milliseconds you want to wait
  }

  return (
    <>
      <nav className="fixed h-20 sm:h-24 p-2 xs:p-4 sm:px-6 flex justify-between w-full lightTheme">
        <div className="flex">
          <Link to="home" smooth={true} duration={800} offset={-100}>
            <NavHeader menuOpen={false} />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 p-4 text-lg">
          <Link
            to="home"
            smooth={true}
            duration={800}
            offset={-100}
            className="navLink"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={800}
            offset={-100}
            className="navLink"
          >
            About
          </Link>
          <Link
            to="music"
            smooth={true}
            duration={800}
            offset={-100}
            className="navLink"
          >
            Music
          </Link>
          <Link
            to="gallery"
            smooth={true}
            duration={800}
            offset={-100}
            className="navLink"
          >
            Gallery
          </Link>
          <Link
            to="calendar"
            smooth={true}
            duration={800}
            offset={-100}
            className="navLink"
          >
            Calendar
          </Link>
        </div>
        <div className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={50} />
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed md:hidden top-0 left-0 w-screen h-screen bg-primary">
          {/* logo and cross */}
          <div className="h-20 sm:h-24 p-2 xs:p-4 flex justify-between w-full">
            <NavHeader menuOpen={true} />
            <div className="flex justify-end">
              <X size={50} className="stroke-white" onClick={closeMenu} />
            </div>
          </div>

          {/* menu on mobile */}

          <ul className="p-2 xs:p-4 text-5xl text-white grid gap-3 w-min">
            <Link
              to="home"
              offset={-100}
              className="hover:underline"
              onClick={clickLink}
            >
              Home
            </Link>
            <Link
              to="about"
              offset={-100}
              className="hover:underline"
              onClick={clickLink}
            >
              About
            </Link>
            <Link
              to="music"
              offset={-100}
              className="hover:underline"
              onClick={clickLink}
            >
              Music
            </Link>
            <Link
              to="gallery"
              offset={-100}
              className="hover:underline"
              onClick={clickLink}
            >
              Gallery
            </Link>
            <Link
              to="calendar"
              offset={-100}
              className="hover:underline"
              onClick={clickLink}
            >
              Calendar
            </Link>
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
