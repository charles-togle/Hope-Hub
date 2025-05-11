import AuthBG from '@/assets/images/auth_bg.png';
import PageHeading from '@/components/auth/PageHeading';

export default function AuthContainer ({ children }) {
  return (
    <section id='auth-container relative'>
      <PageHeading className={'border-0'}></PageHeading>
      <img
        src={AuthBG}
        alt=''
        className='w-full h-screen absolute -z-1 top-0'
      />
      <div className='flex justify-center items-center w-full'>{children}</div>
    </section>
  );
}
