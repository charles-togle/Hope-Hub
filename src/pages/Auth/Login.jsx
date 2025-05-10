import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormInput from '@/components/auth/FormInput';
import InputContainer from '../../components/auth/InputContainer';
import FormButton from '../../components/auth/FormButton';
import { useState } from 'react';
import supabase from '@/client/supabase';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('');
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <AuthContainer>
      <FormContainer>
        <FormHeading
          action='Sign Up'
          callToAction={`Don't have an account?`}
          heading='LOGIN'
          link={'/auth/register'}
        ></FormHeading>
        <InputContainer>
          <FormInput
            value={email}
            placeholder='Email'
            setValue={setEmail}
          ></FormInput>
          <FormInput
            value={password}
            setValue={setPassword}
            placeholder='Password'
            type='password'
          ></FormInput>
        </InputContainer>
        {errorMessage && (
          <p className='text-red-500 text-sm font-semibold font-content mt-2 mb-1'>
            {errorMessage}
          </p>
        )}
        <div className='flex flex-row justify-between font-content text-sm'>
          <div className='text-accent-gray flex gap-4 pl-2'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <p className='text-accent-light-blue'>Forgot Password? </p>
        </div>
        <FormButton text='Login' onClick={handleLogin}></FormButton>
      </FormContainer>
    </AuthContainer>
  );
}
