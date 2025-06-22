import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormInput from '@/components/auth/FormInput';
import InputContainer from '../../components/auth/InputContainer';
import FormButton from '../../components/auth/FormButton';
import { useState } from 'react';
import supabase from '@/client/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      await supabase.auth.setAuthPersistence(rememberMe ? 'local' : 'session');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Login Success');
        navigate('/dashboard');
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
        {successMessage && (
          <p className='text-green font-content font-semibold'>
            {successMessage}
          </p>
        )}
        <div className='flex flex-row justify-between font-content text-sm'>
          <div className='text-accent-gray flex gap-4 pl-2'>
            <input
              type='checkbox'
              id='remember-me'
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button
            className='text-accent-light-blue cursor-pointer'
            onClick={() => navigate('/auth/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>
        <FormButton text='Login' onClick={handleLogin}></FormButton>
      </FormContainer>
    </AuthContainer>
  );
}
