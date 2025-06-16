export default function Container ({ children, heading, className }) {
  return (
    <div className={`${className} w-full`}>
      <h1 className='text-xl px-15 py-7 rounded-t-lg bg-secondary-dark-blue text-white font-content text-center'>
        {heading}
      </h1>
      <div className='flex flex-col rounded-b-lg border-2 border-secondary-dark-blue pr-15 pl-15 pt-8 pb-10 relative'>
        {children}
        <hr className='w-[50%] h-0 absolute border-1 border-primary-yellow bottom-7 left-0' />
      </div>
    </div>
  );
}
