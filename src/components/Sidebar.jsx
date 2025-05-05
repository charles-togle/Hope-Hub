import SidebarLogo from '../assets/logos/hopehub_logo_v1.png';
import SidebarLogoSmall from '../assets/logos/logo_small_sidebar.png';
import HomeIcon from '../assets/icons/home_sidebar.png';
import CalculatorIcon from '../assets/icons/calculator_sidebar.png';
import LecturesIcon from '../assets/icons/lecture_sidebar.png';
import QuizIcon from '../assets/icons/quiz_sidebar.png';
import PhysicalFitnessIcon from '../assets/icons/physicalFitnessTest_sidebar.png';
import AboutIcon from '../assets/icons/about_sidebar.png';
import ProfileIcon from '../assets/icons/profile_sidebar.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/sidebar.css';

export default function Sidebar() {
  const SidebarButtons = [
    { text: 'Home', icon: HomeIcon, route: 'home' },
    {
      text: 'Health Calculators',
      icon: CalculatorIcon,
      route: '/health-calculators',
    },
    { text: 'Lectures', icon: LecturesIcon, route: '/lectures' },
    {
      text: 'Quizzes/Activities',
      icon: QuizIcon,
      route: '/quizzes-and-activities',
    },
    {
      text: 'Physical Fitness Test',
      icon: PhysicalFitnessIcon,
      route: 'physical-fitness-test/parq',
    },
    {
      text: 'Discover More',
      icon: PhysicalFitnessIcon,
      route: '/discover-more',
    },
    { text: 'About', icon: AboutIcon, route: '/about' },
    { text: 'Profile', icon: ProfileIcon, route: '/profile' },
  ];

  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const [isWide, setIsWide] = useState(false);

  const handleClick = (index, route) => {
    navigate(route);
    setActive(index);
  };

  const handleOnMouseEnter = () => {
    setIsWide((prev) => !prev);
  };

  return (
    <aside
      id="sidebar"
      className="hidden w-[7vw] h-screen overflow-hidden bg-secondary-dark-blue relative border-r-4
      border-r-secondary-dark-blue lg:flex flex-col items-center 
      transition-all duration-400"
      onMouseEnter={() => handleOnMouseEnter()}
      onMouseLeave={() => handleOnMouseEnter()}
    >
      <div
        id="logo"
        className={`fulltransition-all w-full duration-400 ease-out flex justify-center ${
          isWide ? 'bg-white' : ''
        }`}
        onClick={() => navigate('/home')}
      >
        {!isWide && <hr className="mt-5 absolute top-0 w-[60%] right-0" />}
        <img
          src={isWide ? SidebarLogo : SidebarLogoSmall}
          alt=""
          className={`transition-all duration-400 w-fit h-40 object-contain`}
        />
      </div>

      <div
        id="sidebar-button"
        className="flex flex-col items-center justify-evenly h-full w-full"
      >
        {SidebarButtons.map((item, index) => (
          <div
            className={`${isWide ? '' : ''} ${
              index === active ? 'brightness-75' : ''
            } w-full bg-secondary-dark-blue pt-2 pb-2 hover:brightness-75 `}
            key={`${item}-${index}`}
          >
            <button
              type="button"
              onClick={() => handleClick(index, item.route)}
              className={`transition-all duration-500  flex items-center w-full relative`}
            >
              <img
                src={item.icon}
                className="transition-all duration-500 mr-5 w-8"
                alt={`${item.text} Icon`}
              />
              <p className=" text-text-content font-heading text-left  border-white p w-[60%]">
                {item.text}
              </p>
              {index === active && (
                <span className="absolute right-2 text-white text-2xl">•</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
