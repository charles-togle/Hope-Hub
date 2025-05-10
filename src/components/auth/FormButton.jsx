export default function FormButton ({ onClick = () => {}, text }) {
  return (
    <button
      className='w-full pt-2 pb-2 font-heading bg-accent-blue text-white text-2xl rounded-sm cursor-pointer'
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
