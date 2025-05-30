import Banner from '@/components/dashboard/Banner';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { useName } from '@/hooks/useDashboardData';
import { useUserId } from '@/hooks/useUserId';
import { useState } from 'react';
import { useMemo } from 'react';
import { onProfileChange as onProfileChangeUtil } from '@/utilities/onProfileChange';
import { useProfilePicture } from '@/hooks/useDashboardData';

export default function TeacherDashboard () {
  const userID = useUserId();
  const [isDataReady, setIsDataReady] = useState(false);
  const teacherName = useName(userID);
  const profilePictureFile = useProfilePicture(userID, isDataReady);
  const memoizedFile = useMemo(
    () => profilePictureFile,
    [profilePictureFile?.name, profilePictureFile?.size],
  );

  const handleProfileChange = async (file, fileName = 'profilePicture') => {
    await onProfileChangeUtil(userID, file, fileName);
  };

  return (
    <section id='teacher-dashboard parent-container'>
      <DashboardContainer>
        <div>
          <Banner isStudent={false} name={teacherName} />
        </div>
        <ProfileSidebar
          memoizedFile={memoizedFile}
          studentName={teacherName}
          onProfileChange={handleProfileChange}
        ></ProfileSidebar>
      </DashboardContainer>
    </section>
  );
}
