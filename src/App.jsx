import './styles/global.css';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Lectures from './pages/LecturesIntroduction';
import LecturePage from './pages/LecturePage';
import PhysicalFitnessDataProvider from './providers/PhysicalFitnessDataProvider';
import { PhysicalFitnessTestPage } from './pages/PhysicalFitnessTestPage';
import PhysicalActivityReadinessQuestionnaire from './pages/PhysicalActivityReadinessQuestionnaire';
import NotFound from './pages/NotFound';
import QuizzesAndActivities from './pages/QuizzesAndActivities';
import Quiz from './pages/Quiz';
import Activity from './pages/Activity';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HealthCalculator from './pages/HealthCalculators/HealthCalculator';

function App() {
  const SideBarOutlet = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 h-screen overflow-x-hidden justify-center relative">
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
          <Route path="HealthCalculator" element={<HealthCalculator />} />
          <Route path="lectures" element={<Lectures />} />
          <Route
            path="lectures/lecture/:lessonNumber/:lectureType"
            element={<LecturePage />}
          />
          <Route
            path="physical-fitness-test"
            element={<PhysicalFitnessWrapper />}
          >
            <Route
              path="parq"
              element={<PhysicalActivityReadinessQuestionnaire />}
            />
            <Route
              path="test/:testIndex"
              element={<PhysicalFitnessTestPage />}
            />
          </Route>
          <Route path="quizzes-and-activities">
            <Route index element={<QuizzesAndActivities />} />
            <Route path="quiz/:quizId" element={<Quiz />} />
            <Route path="activity/:activityId" element={<Activity />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
