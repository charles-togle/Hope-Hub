export default function Banner ({
  name = 'name',
  classCode = '123a45',
  onClassLeave = () => {},
  onClassJoinOpen = () => {},
  isStudent = true,
}) {
  return (
    <div
      id='banner'
      className={`bg-gradient-to-r from-[#111C4E] to-[#004AAD] w-full font-content text-white p-10 text-xl ${
        isStudent ? 'grid grid-cols-[60%_10%_25%]' : 'flex'
      }`}
    >
      <div className=''>
        <p className='font-bold'>Welcome Back, {name}!</p>
        <p>
          Embark on your journey to achieve your fitness goals and unlock your
          full potential today!
        </p>
      </div>
      {isStudent && (
        <>
          {' '}
          <div className='flex items-center justify-center h-full'>
            <div className='w-px h-full bg-white mx-auto' />
          </div>
          <div
            id='class-code'
            className='flex items-center justify-center flex-col'
          >
            <p
              className={`font-content italic  ${
                classCode ? 'text-left mb-5' : 'text-center text-lg mb-2'
              }`}
            >
              {(classCode && 'Class Code: ') ||
                'Currently not enrolled in a class'}

              <span className='text-primary-yellow font-bold'>{classCode}</span>
            </p>
            <button
              className='bg-[#DB4E34] rounded-md  w-full py-3 text-sm italic hover:brightness-90'
              onClick={
                classCode ? () => onClassLeave() : () => onClassJoinOpen()
              }
            >
              {classCode ? 'Leave Class' : 'Join Class'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
