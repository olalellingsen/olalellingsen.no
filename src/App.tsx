import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Footer from "./components/Footer";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="lightTheme flex flex-col min-h-screen font-extralight">
          <Navbar />
          <div className="flex-grow">
            <div className="mainContent">
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/home" Component={Home} />
                <Route path="/projects" Component={Projects} />
                <Route path="/projects/:artist" Component={ProjectDetails} />
                <Route path="/music" Component={Music} />
                <Route path="/calendar" Component={Calendar} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
