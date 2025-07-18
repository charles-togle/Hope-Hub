import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormInput from '@/components/auth/FormInput';
import InputContainer from '../../components/auth/InputContainer';
import FormButton from '../../components/auth/FormButton';
import { useState } from 'react';
import supabase from '@/client/supabase';
import LectureProgress from '@/utilities/LectureProgress';
import { useEffect } from 'react';

export default function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEducator, setEducator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = value => {
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (password && value !== password) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  };
  const handleRegister = async () => {
    setErrorMessage('');
    setIsLoading(true);
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Trim all inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedName = name.trim();

    const fields = [
      trimmedEmail,
      trimmedPassword,
      trimmedConfirmPassword,
      trimmedName,
    ];

    const areAllFieldsFilled = fields.every(field => field !== '');
    if (!areAllFieldsFilled) {
      setErrorMessage('Please fill up all required fields');
      setSuccessMessage('');
      setIsLoading(false);
      return;
    }

    const userType = isEducator ? 'teacher' : 'student';

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
      options: {
        emailRedirectTo:
          'https://hope-hub-fitness.vercel.app/auth/account-verification',
        data: {
          fullName: trimmedName,
          userType: userType,
          classCode: null,
          lectureProgress: LectureProgress(),
          password: trimmedPassword,
        },
      },
    });
    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
      setIsLoading(false);
      return;
    }

    if (!data || !data.user) {
      setErrorMessage('Registration succeeded, but user info is missing.');
      setSuccessMessage('');
      setIsLoading(false);
      return;
    }

    setSuccessMessage('Verification has been sent to your email');
    setIsLoading(false);
  };

  return (
    <AuthContainer>
      <FormContainer>
        <FormHeading
          heading='SIGN UP'
          link='/auth/login'
          callToAction='Already have an account?'
          action='Login'
        ></FormHeading>
        <InputContainer>
          <FormInput
            value={name}
            placeholder='Name'
            setValue={setName}
          ></FormInput>
          <FormInput
            value={email}
            placeholder='Email'
            setValue={setEmail}
            type='email'
          ></FormInput>
          <FormInput
            value={password}
            placeholder='Password'
            setValue={handlePasswordChange}
            type='password'
          ></FormInput>
          <FormInput
            value={confirmPassword}
            placeholder='Confirm Password'
            setValue={handleConfirmPasswordChange}
            type='password'
          ></FormInput>
          <div className='flex gap-3 text-accent-gray items-center font-content'>
            <input
              type='checkbox'
              id='educator'
              onChange={() => setEducator(prev => !prev)}
            />
            <label htmlFor='educator'>I am an educator </label>
          </div>
        </InputContainer>
        {errorMessage && (
          <p className='text-red font-content font-semibold'>{errorMessage}</p>
        )}
        {successMessage && (
          <p className='text-green font-content font-semibold'>
            {successMessage}
          </p>
        )}
        <div className='relative flex items-center w-full'>
          <span className='text-accent-gray font-content text-xs text-justify'>
            By clicking Sign Up, you consent to Hope Hub gathering necessary
            information to provide educational services and improve your
            learning experience. This data collection is in accordance with the
            Data Privacy Act of the Philippines (Republic Act No. 10173).
          </span>
        </div>
        <FormButton
          text={isLoading ? 'Signing you up...' : 'Sign Up'}
          onClick={handleRegister}
          disabled={isLoading}
        />{' '}
      </FormContainer>
    </AuthContainer>
  );
}
