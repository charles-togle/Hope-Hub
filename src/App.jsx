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
import BMI from './pages/HealthCalculators/BMI';
import BMR from './pages/HealthCalculators/BMR';
import BodyFatPercentage from './pages/HealthCalculators/BodyFatPercentage';
import Calorie from './pages/HealthCalculators/Calorie';
import IBW from './pages/HealthCalculators/IBW';
import TDEE from './pages/HealthCalculators/TDEE';
import WaterIntake from './pages/HealthCalculators/WaterIntake';
import LectureProgressProvider from './providers/LectureProvider';
import Home from './pages/Home';
import { PhysicalFitnessTestSummary } from './pages/PhysicalFitnessTestSummary';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import DiscoverMore from './pages/DiscoverMore';
import StudentDashboard from './pages/Profiles/StudentDashboard';

function App () {
  const SideBarOutlet = () => {
    return (
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <div className='flex-1 h-screen overflow-x-hidden justify-center relative'>
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

  const LectureWrapper = () => {
    return (
      <LectureProgressProvider>
        <Outlet />
      </LectureProgressProvider>
    );
  };

  const AuthWrapper = () => {
    return <Outlet />;
  };

  const ProfileWrapper = () => {
    const isAdmin = false;

    if (isAdmin) {
      return (
        // <div></div> admin here
        <></>
      );
    } else {
      return <StudentDashboard />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SideBarOutlet />} path='/'>
          <Route path='home' element={<Home />}></Route>
          <Route path='about' element={<About />} />
          <Route path='health-calculators' element={<HealthCalculator />} />
          <Route path="health-calculators/bmi" element={<BMI />} />
          <Route path="health-calculators/BMR" element={<BMR />} />
          <Route path="health-calculators/BodyFatPercentage" element={<BodyFatPercentage />} />
          <Route path="health-calculators/calorie" element={<Calorie />} />
          <Route path="health-calculators/ibw" element={<IBW />} />
          <Route path="health-calculators/TDEE" element={<TDEE />} />
          <Route path="health-calculators/WaterIntake" element={<WaterIntake />} />

          <Route path='lectures' element={<LectureWrapper />}>
            <Route index element={<Lectures />} />
            <Route
              path='lecture/:lessonNumber/:lectureType'
              element={<LecturePage />}
            />
          </Route>
          <Route
            path='discover-more'
            element={<DiscoverMore></DiscoverMore>}
          ></Route>
          <Route
            path='physical-fitness-test'
            element={<PhysicalFitnessWrapper />}
          >
            <Route
              path='parq'
              element={<PhysicalActivityReadinessQuestionnaire />}
            />
            <Route
              path='test/:testIndex'
              element={<PhysicalFitnessTestPage />}
            />
            <Route
              path='summary'
              element={<PhysicalFitnessTestSummary />}
            ></Route>
          </Route>
          <Route path='quizzes-and-activities'>
            <Route index element={<QuizzesAndActivities />} />
            <Route path='quiz/:quizId' element={<Quiz />} />
            <Route path='activity/:activityId' element={<Activity />} />
          </Route>
          <Route path='auth' element={<AuthWrapper />}>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='forgot-password' element={<ForgotPassword />}></Route>
            <Route path='change-password' element={<ChangePassword />}></Route>
          </Route>
          <Route path='profile' element={<ProfileWrapper />}></Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
