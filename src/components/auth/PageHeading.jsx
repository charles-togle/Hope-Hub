export default function PageHeading ({ className }) {
  return (
    <div
      id='page-heading'
      className={`${className} h-[20vh] flex justify-center items-center flex-col text-center lg:h-[25vh]`}
    >
      <h1 className='text-center font-heading text-4xl lg:text-5xl text-white'>
        Hope Hub
      </h1>
      <hr className='w-[40%] lg:w-[20%] border-1 border-primary-yellow m-3' />
      <p className='text-2xl font-heading lg:text-2xl text-primary-yellow'>
        Power of Physical Education
      </p>
    </div>
  );
}
