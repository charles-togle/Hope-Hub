import './styles/global.css';
import { useState, useEffect } from 'react';
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
import LectureProgressProvider from './providers/LectureProvider';
import Home from './pages/Home';
import { PhysicalFitnessTestSummary } from './pages/PhysicalFitnessTestSummary';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import DiscoverMore from './pages/DiscoverMore';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import HamburgerMenu from './assets/icons/hamburger_icon.png';
import AccountVerification from './pages/Auth/AccountVerification';
import TeacherDashboard from './pages/Dashboard/TeacherDashboard';
import supabase from './client/supabase';
import BMICalculator from './pages/HealthCalculators/BMICalculator';
import BMRCalculator from './pages/HealthCalculators/BMRCalculator';
import TDEECalculator from './pages/HealthCalculators/CalorieTDEECalculator';
import IBWCalculator from './pages/HealthCalculators/IBWCalculator';
import { HealthCalculatorWrapper } from './pages/HealthCalculators/HealthCalculatorsWrapper';
import { useUserId } from './hooks/useUserId';

function SidebarLayout () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleHamburgerClick = () => setSidebarOpen(open => !open);
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className='lg:pt-0 flex-1 h-screen overflow-x-hidden overflow-y-auto justify-center relative'>
        <div className='hamburger-menu pl-5 flex items-center top-0 w-screen h-20 bg-secondary-dark-blue mb-5 lg:hidden relative'>
          <img
            src={HamburgerMenu}
            className='w-10 pr-3 cursor-pointer'
            onClick={handleHamburgerClick}
          />
          <p className='text-white text-3xl font-heading'>Hope Hub</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

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
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userID = useUserId();

  useEffect(() => {
    async function getType () {
      if (!userID) {
        return;
      }
      const { data, error: userTypeError } = await supabase
        .from('profile')
        .select('user_type')
        .eq('uuid', userID)
        .single();
      if (userTypeError) {
        console.log(
          'there was a problem fetching user type',
          userTypeError.message,
        );
        return;
      }
      setIsTeacher(data.user_type === 'teacher');
      setIsLoading(false);
    }
    getType();
  }, [userID]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isTeacher) {
    return <TeacherDashboard></TeacherDashboard>;
  } else {
    return <StudentDashboard />;
  }
};

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />} path='/'>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='about' element={<About />} />{' '}

          <Route path = 'health-calculators' element = {<HealthCalculator/>}> </Route>
          <Route
            path='health-calculators'
            element={<HealthCalculatorWrapper />}
          >
            <Route path='bmi' element={<BMICalculator />} />
            <Route path='bmr' element={<BMRCalculator />} />
            <Route path='CalorieTDEECalculator' element={<TDEECalculator />} />
            <Route path='ibw' element={<IBWCalculator />} />
          </Route>
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
              path='summary/:testType'
              element={<PhysicalFitnessTestSummary />}
            ></Route>
          </Route>
          <Route path='quizzes-and-activities'>
            <Route index element={<QuizzesAndActivities />} />
            <Route path='quiz/:quizId' element={<Quiz />} />
            <Route path='activity/:activityId' element={<Activity />} />
          </Route>
          <Route path='profile' element={<ProfileWrapper />}></Route>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='auth' element={<AuthWrapper />}>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='forgot-password' element={<ForgotPassword />}></Route>
          <Route path='change-password' element={<ChangePassword />}></Route>
          <Route
            path='account-verification'
            element={<AccountVerification />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
