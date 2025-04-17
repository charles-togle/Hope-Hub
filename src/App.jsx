import "./styles/global.css";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Lectures from "./pages/Lectures";
import LecturePage from "./pages/LecturePage";

function App() {
  const SideBarOutlet = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-scroll overflow-x-hidden justify-center">
          <Outlet />
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBarOutlet />} path="/">
          <Route path="about" element={<About />}></Route>
          <Route path="lectures" element={<Lectures />}></Route>
          <Route
            path="lectures/lecture/:lessonNumber"
            element={<LecturePage />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
