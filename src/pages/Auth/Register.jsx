import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormInput from '@/components/auth/FormInput';
import InputContainer from '../../components/auth/InputContainer';
import FormButton from '../../components/auth/FormButton';
import { useState } from 'react';
import supabase from '@/client/supabase';

export default function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classCode, setClassCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
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
            placeholder='Class Code'
            setValue={setClassCode}
          ></FormInput>
          <FormInput
            value={password}
            placeholder='Password'
            setValue={handlePasswordChange} // Use custom handler
            type='password'
          ></FormInput>
          <FormInput
            value={confirmPassword}
            placeholder='Confirm Password'
            setValue={handleConfirmPasswordChange} // Use custom handler
            type='password'
          ></FormInput>
        </InputContainer>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}{' '}
        {/* Display error message */}
        <FormButton text='Sign Up' onClick={handleRegister}></FormButton>{' '}
        {/* Attach handleRegister */}
      </FormContainer>
    </AuthContainer>
  );
}
