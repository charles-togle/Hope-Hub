export default function RowContainer ({ children }) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 my-3 w-[95%]'>
      {children}
    </div>
  );
}
