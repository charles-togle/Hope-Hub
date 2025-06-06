import FormContainer from '../auth/FormContainer';
import FormHeading from '../auth/FormHeading';
import FormInput from '../auth/FormInput';
import FormButton from '../auth/FormButton';
import { useState, useEffect, useRef } from 'react';

export default function JoinClass ({
  tempClassCode,
  setTempClassCode,
  handleClose = () => {},
  handleJoinClass = () => {},
}) {
  const [error, setError] = useState('');
  const formRef = useRef(null);

  function isValidClassCode (code) {
    return code.length === 6;
  }

  const handleJoin = () => {
    if (!isValidClassCode(tempClassCode)) {
      setError('A class code should contains 6 characters');
      return;
    }
    setError('');
    handleJoinClass();
  };

  useEffect(() => {
    function handleClick (e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClose]);

  return (
    <div className='w-full h-screen fixed top-0 z-999'>
      <div className='w-full h-full flex justify-center items-center'>
        <div
          id='backdrop'
          className='w-full h-full absolute top-0 bg-black opacity-40 -z-1'
        ></div>
        <FormContainer ref={formRef}>
          <FormHeading heading='Join a class'></FormHeading>
          <FormInput
            value={tempClassCode}
            setValue={setTempClassCode}
            placeholder='6 digit class code'
          ></FormInput>
          {error && (
            <p className='text-red-500 text-sm font-content font-semibold'>
              {error}
            </p>
          )}
          <FormButton
            className='disabled:brightness-70'
            text='Join'
            onClick={handleJoin}
          ></FormButton>
        </FormContainer>
      </div>
    </div>
  );
}
