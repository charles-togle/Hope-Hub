export default function PageHeading ({ text, className }) {
  return (
    <div
      id='page-heading'
      className={`${className} md:h-[35vh] h-[15dvh] flex justify-center items-center flex-col border-b-2 border-black text-center lg:h-[25vh]`}
    >
      <h1 className='text-center text-primary-blue font-heading text-3xl lg:text-5xl '>
        {text}
      </h1>
      <hr className='w-[40%] lg:w-[20%] border-1 border-primary-yellow m-3' />
      <p className='text-xl font-heading lg:text-2xl'>
        Power of Physical Education
      </p>
    </div>
  );
}
