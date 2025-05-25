import SidebarLogo from '../assets/logos/hopehub_logo_v1.png';
import SidebarLogoSmall from '../assets/logos/logo_small_sidebar.png';
import HomeIcon from '../assets/icons/home_sidebar.png';
import CalculatorIcon from '../assets/icons/calculator_sidebar.png';
import LecturesIcon from '../assets/icons/lecture_sidebar.png';
import QuizIcon from '../assets/icons/quiz_sidebar.png';
import DiscoverIcon from '../assets/icons/discover-more_sidebar.png';
import PhysicalFitnessIcon from '../assets/icons/physicalFitnessTest_sidebar.png';
import AboutIcon from '../assets/icons/about_sidebar.png';
import ProfileIcon from '../assets/icons/profile_sidebar.png';
import ActiveHomeIcon from '../assets/icons/activeIcons/ActiveHomeIcon.png';
import ActiveCalculatorIcon from '../assets/icons/activeIcons/ActiveCalculatorsIcon.png';
import ActiveLecturesIcon from '../assets/icons/activeIcons/ActiveLecturesIcon.png';
import ActiveQuizIcon from '../assets/icons/activeIcons/ActiveQuizIcon.png';
import ActivePhysicalFitnessIcon from '../assets/icons/activeIcons/ActivePhysicalIcon.png';
import ActiveDiscoverIcon from '../assets/icons/activeIcons/ActiveDiscoverIcon.png';
import ActiveAboutIcon from '../assets/icons/activeIcons/ActiveAboutIcon.png';
import ActiveProfileIcon from '../assets/icons/activeIcons/ActiveProfileIcon.png';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '@/styles/sidebar.css';

export default function Sidebar ({ isOpen, onClose }) {
  const SidebarButtons = [
    { text: 'Home', icon: HomeIcon, route: '/home' },
    {
      text: 'Health Calculators',
      icon: CalculatorIcon,
      route: '/health-calculators',
    },
    { text: 'Lectures', icon: LecturesIcon, route: '/lectures' },
    {
      text: 'Quizzes / Activities',
      icon: QuizIcon,
      route: '/quizzes-and-activities',
    },
    {
      text: 'Physical Fitness Test',
      icon: PhysicalFitnessIcon,
      route: '/physical-fitness-test/parq',
    },
    {
      text: 'Discover More',
      icon: DiscoverIcon,
      route: '/discover-more',
    },
    { text: 'About', icon: AboutIcon, route: '/about' },
    { text: 'Profile', icon: ProfileIcon, route: '/profile' },
  ];

  // Complete ActiveIconVariants for all sidebar buttons
  const ActiveIconVariants = {
    Home: ActiveHomeIcon,
    'Health Calculators': ActiveCalculatorIcon,
    Lectures: ActiveLecturesIcon,
    'Quizzes / Activities': ActiveQuizIcon,
    'Physical Fitness Test': ActivePhysicalFitnessIcon,
    'Discover More': ActiveDiscoverIcon,
    About: ActiveAboutIcon,
    Profile: ActiveProfileIcon,
  };

  const location = useLocation();
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();
  const [isWide, setIsWide] = useState(false);

  // Add isMobile variable
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    const handleClick = e => {
      // Only close if click is outside the sidebar
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target)) {
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMobile, isOpen, onClose]);

  // Determine active index based on current path
  useEffect(() => {
    const foundIndex = SidebarButtons.findIndex(btn => {
      // Support both exact and partial matches for nested routes
      if (btn.route === '/') return location.pathname === '/';
      return location.pathname.startsWith(btn.route.replace(/\/$/, ''));
    });
    setActive(foundIndex);
  }, [location.pathname]);

  const handleClick = (index, route) => {
    navigate(route);
    setActive(index);
    if (isMobile && typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOnMouseEnter = () => {
    setIsWide(prev => !prev);
  };

  const handleTransitionEnd = () => {
    if (!isOpen && isMobile) setShouldRender(false);
  };

  return (
    <aside
      id='sidebar'
      className={`${
        isMobile ? '' : 'aside '
      } lg:w-[7vw] w-[60vw] h-screen overflow-hidden bg-secondary-dark-blue lg:relative
      border-r-secondary-dark-blue lg:flex flex-col items-center absolute z-999
      transition-all duration-400
      ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full w-0!') : ''}
      `}
      onTransitionEnd={handleTransitionEnd}
      onMouseEnter={() => handleOnMouseEnter()}
      onMouseLeave={() => handleOnMouseEnter()}
    >
      <div
        id='logo'
        className={`fulltransition-all w-full duration-400 ease-out flex justify-center items-center] ${
          isWide || (isMobile && isOpen) ? 'bg-white' : ''
        }`}
        onClick={() => navigate('/home')}
      >
        {!isWide && <hr className='mt-5 absolute top-0 w-[60%] right-0' />}
        <img
          src={isWide || (isMobile && isOpen) ? SidebarLogo : SidebarLogoSmall}
          alt=''
          className={`transition-all duration-400 w-fit h-[15dvh] mt-[3vh] mb-[3vh] lg:mt-0 lg:h-40 object-contain`}
        />
      </div>

      <div
        id='sidebar-button'
        className='flex flex-col items-center justify-around lg:justify-evenly w-full h-[75dvh] lg:h-full'
      >
        {SidebarButtons.map((item, index) => (
          <div
            className={`${
              isWide && !isMobile ? '' : ''
            } w-full bg-secondary-dark-blue pt-2 pb-2 `}
            key={`${item}-${index}`}
          >
            <button
              type='button'
              onClick={() => handleClick(index, item.route)}
              className={`transition-all duration-500 flex items-center w-full relative`}
            >
              <div
                className={`highlight opacity-0 ${
                  index === active ? 'block opacity-30 ' : ''
                } absolute w-full bg-black z-0 pb-6 pt-6              
                `}
              ></div>
              <img
                src={
                  index === active ? ActiveIconVariants[item.text] : item.icon
                }
                className='relative z-1 transition-all duration-500 ml-5 lg:ml-0 mr-5 w-8 lg:w-unset lg:h-8'
                alt={`${item.text} Icon`}
              />
              <p className='relative z-1 text-lg text-text-content text-wrap font-heading text-left border-white lg:w-[60%] lg:text-base'>
                {item.text}
              </p>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
