import "./styles/global.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

//CONTENT COMPONENTS SHOULD BE 100VW-18VW WIDE
//SIDEBAR SIZE IS 18VW

function App() {
  const SideBarOutlet = () => {
    return (
      <Sidebar>
        <Outlet />
      </Sidebar>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBarOutlet />} path="/">
          {/* Add nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;