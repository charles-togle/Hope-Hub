export default function InputContainer ({ children }) {
  return (
    <div id='form-inputs' className='flex flex-col gap-3'>
      {children}
    </div>
  );
}
