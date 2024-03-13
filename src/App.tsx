import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Footer from "./components/Footer";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import Admin from "./pages/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="lightTheme flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="pt-16 xs:pt-24 px-2 sm:pt-24 sm:p-6 lg:px-24 xl:px-40 2xl:px-80 grid gap-12 md:gap-20 mb-24">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/home" Component={Home} />
              <Route path="/projects" Component={Projects} />
              <Route path="/music" Component={Music} />
              <Route path="/calendar" Component={Calendar} />
              <Route path="/admin" Component={Admin} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
