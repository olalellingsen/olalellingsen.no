import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Footer from "./components/Footer";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProjectDetails from "./pages/ProjectDetails";
import SmoothRender from "./components/SmoothRender";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <div className="darkTheme flex flex-col min-h-screen font-extralight">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/projects" Component={Projects} />
                <Route path="/projects/:artist" Component={ProjectDetails} />
                <Route path="/music" Component={Music} />
                <Route path="/calendar" Component={Calendar} />
              </Routes>
            </div>
            <SmoothRender>
              <Footer />
            </SmoothRender>
          </div>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
