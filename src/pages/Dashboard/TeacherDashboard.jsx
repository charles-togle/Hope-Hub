import Banner from '@/components/dashboard/Banner';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { useName } from '@/hooks/useDashboardData';
import { useUserId } from '@/hooks/useUserId';
import { useState } from 'react';
import { useMemo } from 'react';
import { onProfileChange as onProfileChangeUtil } from '@/utilities/onProfileChange';
import { useProfilePicture } from '@/hooks/useDashboardData';
import { useEffect } from 'react';
import ClassCode from '@/components/dashboard/ClassCode';
import AddClassCode from '@/components/dashboard/AddClassCode';
import { Plus } from 'lucide-react';
import supabase from '@/client/supabase';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard () {
  const userID = useUserId();
  const [isDataReady, setIsDataReady] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const teacherName = useName(userID, isDataReady);
  const [profilePictureFile, setProfilePictureFile] = useProfilePicture(
    userID,
    isDataReady,
  );
  const [classCodes, setClassCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const memoizedFile = useMemo(
    () => profilePictureFile,
    [profilePictureFile?.name, profilePictureFile?.size],
  );
  const navigate = useNavigate();

  const handleProfileChange = async (file, fileName = 'profilePicture') => {
    await onProfileChangeUtil(userID, file, fileName);
  };

  useEffect(() => {
    if (!userID) return;
    setIsDataReady(true);
  }, [userID]);

  const handleAddClass = () => {
    setShowAddClassModal(true);
  };

  useEffect(() => {
    async function getClassCodes () {
      if (!userID) return;

      const { data, error } = await supabase
        .from('teacher_class_code')
        .select('class_code, class_name, class_color')
        .eq('uuid', userID);

      if (error) {
        console.error('Error fetching class codes:', error);
        return;
      }
      setClassCodes(data || []);
      setIsLoading(false);
    }

    getClassCodes();
  }, [userID]);
  const handleClassCreated = newClass => {
    setClassCodes(prevCodes => [...prevCodes, newClass]);
    setShowAddClassModal(false);
  };
  const handleRemoveClass = async classCode => {
    try {
      const { data, error } = await supabase
        .from('teacher_class_code')
        .delete()
        .eq('class_code', classCode)
        .eq('uuid', userID)
        .select();

      if (error) {
        console.error('Error removing class:', error);
        return;
      }

      if (data && data.length === 0) {
        console.warn('No class found to delete with code:', classCode);
        return;
      }

      setClassCodes(prevCodes =>
        prevCodes.filter(code => code.class_code !== classCode),
      );

      console.log('Successfully deleted class:', classCode);
    } catch (err) {
      console.error('Error removing class:', err);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('There was a problem logging you out', error.message);
      return;
    }
    navigate('/');
  };

  if (!userID || isLoading) {
    return (
      <div className='w-full flex items-center justify-center h-screen'>
        <div className='font-content font-medium text-xl text-center w-full'>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <section id='teacher-dashboard parent-container relative'>
      <div className='absolute left-0'>
        {showAddClassModal && (
          <AddClassCode
            onAdd={handleClassCreated}
            setModalShown={setShowAddClassModal}
          />
        )}
      </div>
      <DashboardContainer>
        <div className='flex gap-4 flex-col relative min-h-[90vh] w-full'>
          <div className='font-heading-small text-primary-blue'>
            <p className='text-4xl'>Hello, Prof. {teacherName} </p>
            <hr className='w-60 border-1 border-primary-yellow mt-2 mb-2' />
            <p className='text-2xl'>Welcome to Teacher’s Dashboard</p>
          </div>
          <Banner isStudent={false} name={teacherName} />{' '}
          <div id='class-codes' className='flex flex-wrap w-full gap-4 pb-40'>
            {classCodes.map(code => (
              <ClassCode
                key={code.class_code}
                name={code.class_name}
                classCode={code.class_code}
                classColor={code.class_color}
                onRemove={() => handleRemoveClass(code.class_code)}
              />
            ))}
          </div>{' '}
          <Plus
            color='white'
            strokeWidth={2}
            className='bg-[#999999] w-12 h-12 p-2 rounded-full absolute bottom-20 right-0 cursor-pointer hover:bg-[#777777] transition-colors'
            onClick={handleAddClass}
          />{' '}
        </div>
        <ProfileSidebar
          memoizedFile={memoizedFile}
          name={teacherName}
          onProfileChange={handleProfileChange}
          handleLogout={handleLogout}
        ></ProfileSidebar>
      </DashboardContainer>
    </section>
  );
}
