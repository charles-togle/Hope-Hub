import AuthBG from '@/assets/images/auth_bg.png';
import PageHeadingAuth from '@/components/auth/PageHeading';

export default function AuthContainer ({ children }) {
  return (
    <section id='auth-container relative'>
      <PageHeadingAuth className={'border-0'}></PageHeadingAuth>
      <img
        src={AuthBG}
        alt=''
        className='w-full h-screen absolute -z-1 top-0'
      />
      <div className='flex justify-center items-center w-full'>{children}</div>
    </section>
  );
}
