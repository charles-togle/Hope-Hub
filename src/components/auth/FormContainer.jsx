export default function FormContainer ({ children, ref }) {
  return (
    <div
      className='md:scale-90 p-8 flex justify-center flex-col bg-white gap-2.5 min-w-[37%] rounded-md'
      ref={ref ? ref : undefined}
    >
      {children}
    </div>
  );
}
