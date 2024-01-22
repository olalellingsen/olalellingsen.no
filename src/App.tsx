// App.jsx
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Footer from "./components/Footer";
import Calendar from "./pages/Calendar";
import Gallery from "./pages/Gallery";
import { useState } from "react";
import Projects from "./pages/Projects";

function App() {
  return (
    <div className="lightTheme">
      <Navbar />
      <div className="pt-20 px-2 sm:pt-24 sm:p-6 lg:px-24 xl:px-40 2xl:px-72 grid gap-12 md:gap-20 mb-24">
        <Home id="Home" />
        <About id="About" />
        <Projects id="Projects" />
        <Music id="Music" />
        {/* <Gallery id="Gallery" /> */}
        <Calendar id="Calendar" />
      </div>
      <Footer id="Footer" />
    </div>
  );
}

export default App;
