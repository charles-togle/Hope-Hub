// hooks/useUserId.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/client/supabase';

export const useUserId = async() => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  return '5c4ffb4f-420c-448c-8abe-7f9b319060a9';
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
