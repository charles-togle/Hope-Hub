import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormButton from '../../components/auth/FormButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import supabase from '@/client/supabase';
import { useCallback } from 'react';

export default function AccountVerification () {
  const navigate = useNavigate();
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);

  const handleRegister = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.user_metadata) {
      setIsBadRequest(true);
      return;
    }

    const { fullName, userType, classCode, lectureProgress } =
      user.user_metadata;
    const userId = user.id;
    const email = user.email;

    if (user.id !== userId) {
      localStorage.removeItem('userData');
      setIsBadRequest(true);
      setTimeout(() => {
        navigate('auth/register');
      }, 1000);
      return;
    }
    const { error: rpcError } = await supabase.rpc('register_user', {
      p_user_id: userId,
      p_full_name: fullName,
      p_email: email,
      p_user_type: userType,
      p_class_code: [classCode] || null,
    });

    if (!rpcError) {
      setUserRegistered(true);
      return;
    }

    if (rpcError) {
      setErrorMessage('Error during registration: ' + rpcError.message);
      return;
    }

    const { error: lectureProgressError } = await supabase
      .from('lecture_progress')
      .upsert({
        uuid: userId,
        lecture_progress: lectureProgress,
      });

    if (lectureProgressError) {
      setErrorMessage(
        'Error initializing lecture progress: ' + lectureProgressError.message,
      );
    }
  };
  useEffect(() => {
    if (!userRegistered) {
      handleRegister();
    }
  }, [userRegistered, handleRegister]);

  if (isBadRequest) {
    return <ErrorMessage text='Error 400' subText='Bad Request'></ErrorMessage>;
  }

  return (
    <AuthContainer>
      <FormContainer>
        <FormHeading
          heading='Account Verified'
          callToAction='Thank you for choosing hope hub'
        ></FormHeading>
        <FormButton
          text='Go to dashboard'
          onClick={() => navigate('/profile')}
        ></FormButton>
        {errorMessage && (
          <p className='text-red font-content font-semibold mt-2'>
            {errorMessage}
          </p>
        )}
      </FormContainer>
    </AuthContainer>
  );
}
