import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormInput from '@/components/auth/FormInput';
import InputContainer from '../../components/auth/InputContainer';
import FormButton from '../../components/auth/FormButton';
import { useState } from 'react';
import supabase from '@/client/supabase';
import LectureProgress from '@/utilities/LectureProgress';

export default function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classCode, setClassCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEducator, setEducator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Trim all inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedName = name.trim();
    const trimmedClassCode = classCode.trim();

    const fields = [
      trimmedEmail,
      trimmedPassword,
      trimmedConfirmPassword,
      trimmedName,
      trimmedClassCode,
    ];

    const areAllFieldsFilled = fields.every(field =>
      field === trimmedClassCode
        ? isEducator
          ? true
          : field !== ''
        : field !== '',
    );

    if (!areAllFieldsFilled) {
      setErrorMessage('Please fill up all fields');
      return;
    }

    const userType = isEducator ? 'teacher' : 'student';

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
      options: {
        emailRedirectTo: 'http://localhost:5173/auth/account-registration',
        data: {
          fullName: trimmedName,
          userType: userType,
          classCode: trimmedClassCode,
          lectureProgress: LectureProgress(),
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (!data || !data.user) {
      setErrorMessage('Registration succeeded, but user info is missing.');
      return;
    }
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
            value={classCode}
            placeholder={
              isEducator ? 'You can create a class later' : 'Enter class code'
            }
            disabled={isEducator}
            setValue={setClassCode}
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
            <label htmlFor='educator'>I am an educator</label>
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
        <FormButton text='Sign Up' onClick={handleRegister}></FormButton>{' '}
      </FormContainer>
    </AuthContainer>
  );
}
