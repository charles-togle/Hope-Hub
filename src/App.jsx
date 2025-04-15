import "./styles/global.css";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

//CONTENT COMPONENTS SHOULD BE 100VW-18VW WIDE
//SIDEBAR SIZE IS 18VW

function App() {
  const SideBarOutlet = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-screen overflow-auto overflow-x-hidden justify-center">
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
