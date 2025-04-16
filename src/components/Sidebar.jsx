import SidebarLogo from "../assets/logos/hopehub_logo_v1.png";
import SidebarLogoSmall from "../assets/logos/logo_small_sidebar.png";
import HomeIcon from "../assets/icons/home_sidebar.png";
import CalculatorIcon from "../assets/icons/calculator_sidebar.png";
import LecturesIcon from "../assets/icons/lecture_sidebar.png";
import QuizIcon from "../assets/icons/quiz_sidebar.png";
import PhysicalFitnessIcon from "../assets/icons/physicalFitnessTest_sidebar.png";
import AboutIcon from "../assets/icons/about_sidebar.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const SidebarButtons = [
    { text: "Home", icon: HomeIcon, route: "" },
    { text: "Health Calculators", icon: CalculatorIcon, route: "" },
    { text: "Lectures", icon: LecturesIcon, route: "/lectures" },
    { text: "Quiz / Activities", icon: QuizIcon, route: "" },
    { text: "Physical Fitness Test", icon: PhysicalFitnessIcon, route: "" },
    { text: "About", icon: AboutIcon, route: "/about" },
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
      className={`w-[7vw] h-screen overflow-hidden bg-secondary-dark-blue relative border-r-4
       border-r-secondary-dark-blue flex flex-col items-center 
       transition-all duration-400 hover:w-[18vw] ${
         isWide ? "" : "border-r-0!"
       }`}
      onMouseEnter={() => handleOnMouseEnter()}
      onMouseLeave={() => handleOnMouseEnter()}
    >
      <div id="logo" className={`${isWide ? "bg-white pt-4" : ""}`}>
        {!isWide && <hr className="mt-5 absolute top-0 w-[60%] right-0" />}
        <img
          src={isWide ? SidebarLogo : SidebarLogoSmall}
          alt=""
          className={`${isWide ? "" : "pt-15 pr-2 pl-2"}`}
        />
      </div>
      <div
        id="sidebar-button"
        className="flex items-center justify-evenly flex-col h-full"
      >
        {SidebarButtons.map((item, index) => (
          <button
            className={`${
              index === active
                ? "contast-125 brightness-50 after:content-[.]"
                : ""
            } ${
              isWide ? "" : "justify-center"
            } flex flex-row items-center w-8/10 hover:brightness-50 hover:contrast-125 relative`}
            key={index}
            type="button"
            onClick={() => handleClick(index, item.route)}
          >
            <img
              src={item.icon}
              className={`${isWide ? "w-2/10 mr-5" : "w-3/10"}`}
            />
            <p
              className={`${
                isWide ? "block" : "hidden"
              } w-5/10 pb-3 text-text-content text-center border-b-3 border-t-white font-heading`}
            >
              {item.text}
            </p>
            <p
              className={`${index === active ? "block" : "hidden"} ${
                isWide ? "" : "right-0!"
              } absolute text-white contrast-125 right-2 text-2xl`}
            >
              •
            </p>
          </button>
        ))}
      </div>

      <div
        id="design-line"
        className={`${
          isWide ? "" : "hidden!"
        } h-fit w-full absolute top-[20vmin] lg:block sm:hidden`}
      >
        <div className="bg-white w-[50%] h-1"></div>
        <div className="bg-transparent w-[45%] h-1 border-b-2 border-r-2 border-white"></div>
      </div>
      <div
        id="design-line"
        className={`${
          isWide ? "" : "hidden!"
        } h-fit w-full absolute bottom-[calc(17vw*0.45)] left-[14vmin] rotate-270`}
      >
        <div className="bg-white w-[50%] h-1"></div>
        <div className="bg-transparent w-[45%] h-1 border-b-2 border-r-2 border-white lg:block sm:hidden"></div>
      </div>
    </aside>
  );
}
