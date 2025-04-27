import Banner from '@/assets/banner_home.svg';
import HomePageHero from '@/assets/images/gym_homepage.png';
import Banner2 from '@/assets/images/gym_banner_home.jpg';
import GymPicture from '@/assets/images/gym3_homepage.png';
export default function Home() {
  return (
    <div
      id="home"
      className="flex items-center w-full font-content h-full flex-col pt-5"
    >
      <section id="hero" className="relative w-full flex items-center flex-col">
        <img src={Banner} alt="home-banner" className="w-[85%]" />
        <div className="absolute aspect-square border-2 border-primary-yellow w-40 right-275 top-50 -z-1"></div>
        <div className="absolute border-2 border-secondary-dark-blue w-70 h-40 top-55 right-110 -z-1"></div>
        <div className="absolute aspect-square border-2 border-primary-yellow w-40 top-25 right-60 -z-1"></div>
        <div className="absolute border-2 border-primary-yellow w-70 h-50 top-170 right-250 -z-1"></div>
        <div className="absolute border-2 border-secondary-dark-blue w-40 h-30 top-200 right-135 -z-1"></div>
        <div className="absolute border-2 border-primary-yellow w-40 h-30 top-170 right-50 -z-1"></div>
        <div
          id="content"
          className="flex flex-row justify-center gap-30 mt-25 mb-25"
        >
          <img src={HomePageHero} alt="" className="w-4/10" />
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-heading text-4xl text-primary-blue">
              Fuel your future <br /> with movement
            </h1>
            <hr className="w-2/3 border-1 border-primary-yellow mt-2 mb-3" />
            <p className="text-xl">
              “Great things come <br /> from hard work and <br /> perseverance.
              No excuses.”
            </p>
            <p className="text-xl font-semibold italic">--Kobe Bryant--</p>
            <button className="px-6 py-3 bg-secondary-dark-blue text-white mr-auto ml-auto mt-10 rounded-lg hover:brightness-85">
              Start your Journey
            </button>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center flex-col items-center pb-10">
        <img
          src={Banner2}
          alt="umak students doing dance"
          className="w-full mb-10"
        />
        <p className="mb-2 text-lg">With us, you are home</p>
        <h2 className="text-primary-yellow font-heading text-6xl">
          Welcome to Hope Hub Web!
        </h2>
        <p className="text-center w-[90%] mt-5 mb-10">
          The Hope Hub, we believe in the Power of Physical Education to inspire
          change and create a lasting impact on well-being. Whether you're
          teaching the next generation of students or building your own fitness
          knowledge, we're here to guide you every step of the way.
        </p>
        <div className="flex flex-row justify-center items-center space-x-15">
          <img src={GymPicture} alt="" />
          <p className="w-4/10 text-center">
            The Hope Hub is dedicated to supporting both teachers and students
            in the field of Physical Education and Health. This platform
            provides resources designed to enhance learning experience and
            promote a healthy, active lifestyle. For educators, we offer
            innovative lesson plans, teaching strategies, and professional
            development materials to foster engaging and effective physical
            education programs. For students, we provide fitness tips, injury
            prevention guidance, and motivation to help them succeed in their
            physical education journey.
          </p>
        </div>
      </section>
      <footer className="flex flex-row bg-[#121212] w-full items-center p-5">
        <p className="text-primary-blue font-content w-fit pl-10 text-3xl font-semibold italic">
          Discover your health <br />
          strenghten your body <br /> unlock your potential
        </p>
        <hr className="h-full border-1 border-primary-yellow mr-10 ml-10" />
        <div className="w-6/10 flex flex-col">
          <p className="text-white text-center mt-5">
            The Hope Hub, we believe in the Power of Physical Education to
            inspire change and create a lasting impact on well-being. Whether
            you're teaching the next generation of students or building your own
            fitness knowledge, we're here to guide you every step of the way.{' '}
          </p>
          <div className="text-white mt-20">Placeholder</div>
        </div>
      </footer>
    </div>
  );
}
