// hooks/useUserId.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/client/supabase';

export const useUserId = async () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // return 'd0c3e568-ee5e-45d8-a3bd-105650aba056';
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log('user not logged in');
        navigate('/auth/login');
        return;
      }
      setUserId(data.session.user.id);
    };

    getSession();
  }, [navigate]);

  return userId;
};
