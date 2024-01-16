// App.jsx
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import Gallery from "./pages/Gallery";

// Remove the border and h-screen class for every page component

function App() {
  return (
    <div className="lightTheme">
      <Navbar />
      <div className="pt-24 px-2 sm:pt-24 sm:p-6 lg:px-24 xl:px-40 2xl:px-72 grid gap-12 md:gap-20 mb-24">
        <Home id="home" />
        <About id="about" />
        <Music id="music" />
        <Gallery id="gallery" />
        <Calendar id="calendar" />
      </div>
      <Footer id="footer" />
    </div>
  );
}

export default App;
