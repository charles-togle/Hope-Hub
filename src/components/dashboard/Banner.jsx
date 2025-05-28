export default function Banner ({
  name = 'name',
  classCode = '123a45',
  onClassLeave = () => {},
}) {
  return (
    <div
      id='banner'
      className='bg-gradient-to-r from-[#111C4E] to-[#004AAD] w-full font-content text-white p-10 text-xl grid grid-cols-[60%_10%_25%]'
    >
      <div className=''>
        <p className='font-bold'>Welcome Back, {name}!</p>
        <p>
          Embark on your journey to achieve your fitness goals and unlock your
          full potential today!
        </p>
      </div>
      <div className='flex items-center justify-center h-full'>
        <div className='w-px h-full bg-white mx-auto' />
      </div>
      <div
        id='class-code'
        className='flex items-center justify-center flex-col'
      >
        <p className='font-content italic'>
          Class Code:
          <span className='text-primary-yellow font-bold'> {classCode}</span>
        </p>
        <button
          className='bg-[#DB4E34] rounded-md mt-5 w-full py-3 text-sm italic hover:brightness-90'
          onClick={() => onClassLeave()}
        >
          Leave Class
        </button>
      </div>
    </div>
  );
}
