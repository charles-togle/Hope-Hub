export default function DashboardContainer ({ children }) {
  return (
    <div className='content-container grid! grid-cols-[75%_25%] w-[93%]! gap-x-10 pt-10! relative min-h-[90vh]'>
      {children}
    </div>
  );
}
