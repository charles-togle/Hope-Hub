import "./styles/global.css";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Lectures from "./pages/LecturesIntroduction";
import LecturePage from "./pages/LecturePage";
import PhysicalFitnessDataProvider from "./providers/PhyscalFitnessDataProvider";
import { PhysicalFitnessTest } from "./pages/PhysicalFitnessTest";
import PhysicalActivityReadinessQuestionnaire from "./pages/PhysicalActivityReadinessQuestionnaire";

function App() {
  const SideBarOutlet = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-screen overflow-x-hidden justify-center">
          <Outlet />
        </div>
      </div>
    );
  };

  const PhysicalFitnessWrapper = () => {
    return (
      <PhysicalFitnessDataProvider>
        <Outlet />
      </PhysicalFitnessDataProvider>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBarOutlet />} path="/">
          <Route path="about" element={<About />} />
          <Route path="lectures" element={<Lectures />} />
          <Route path="lectures/lecture/:lessonNumber" element={<LecturePage />} />
          <Route path="physical-fitness-test" element={<PhysicalFitnessWrapper />}>
            <Route path="parq" element={<PhysicalActivityReadinessQuestionnaire />} />
            <Route path="test/:testIndex" element={<PhysicalFitnessTest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
