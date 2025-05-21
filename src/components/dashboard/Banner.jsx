export default function Banner ({ name = 'name' }) {
  return (
    <div
      id='banner'
      className='bg-gradient-to-r from-[#111C4E] to-[#004AAD] w-full font-content text-white p-10 text-xl'
    >
      <p className='font-bold'>Welcome Back, {name}!</p>
      <p className='ml-5'>
        Embark on your journey to achieve your fitness goals and unlock your
        full potential today!
      </p>
    </div>
  );
}
