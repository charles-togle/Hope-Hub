export default function Content ({ title, content }) {
  return (
    <div className='w-full flex flex-col'>
      <h2 className='text-2xl text-primary-blue font-content font-bold'>
        {title}:
      </h2>
      <hr className='h-0 w-60 border-1 border-primary-yellow mt-2 mb-4' />
      <p className='font-content'>{content}</p>
    </div>
  );
}
