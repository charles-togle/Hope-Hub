import AuthContainer from '@/components/auth/AuthContainer';
import FormContainer from '@/components/auth/FormContainer';
import FormHeading from '@/components/auth/FormHeading';
import FormButton from '../../components/auth/FormButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import ErrorMessage from '@/components/utilities/ErrorMessage';
import supabase from '@/client/supabase';
import { useRef } from 'react';
import Loading from '@/components/Loading';

export default function AccountVerification () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userRegistered = useRef(false);

  const handleRegister = async (retryCount = 0) => {
    setIsLoading(true);
    let accessToken = searchParams.get('access_token');
    let refreshToken = searchParams.get('refresh_token');

    if (!accessToken && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      accessToken = hashParams.get('access_token');
      refreshToken = hashParams.get('refresh_token');
    }

    if (accessToken && refreshToken) {
      console.log('Setting session from URL tokens...');
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        console.error('Session error:', sessionError);
        setErrorMessage('Error setting session: ' + sessionError.message);
        setIsLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.user_metadata) {
      if (retryCount < 3) {
        setTimeout(() => {
          handleRegister(retryCount + 1);
        }, (retryCount + 1) * 1000);
        return;
      }

      setErrorMessage('User data not found. Please try registering again.');
      setIsLoading(false);
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
      setIsLoading(false);
      return;
    }

    console.log(userType);
    const { error: rpcError } = await supabase.rpc('register_user', {
      p_user_id: userId,
      p_full_name: fullName,
      p_email: email,
      p_user_type: userType,
      p_class_code: classCode || null,
      p_lecture_progress: lectureProgress,
    });

    if (rpcError) {
      setErrorMessage('Error during registration: ' + rpcError.message);
      setIsLoading(false);
      setTimeout(() => {
        supabase.auth.signOut();
      }, 1500);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!userRegistered.current) {
      userRegistered.current = true;
      handleRegister();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
          onClick={() => navigate('/dashboard')}
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
