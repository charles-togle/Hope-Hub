export default function DashboardContainer ({ children }) {
  return (
    <div className='content-container lg:grid! lg:grid-cols-[75%_25%] w-[93%]! gap-x-10 pt-30! relative lg:min-h-[90vh]'>
      {children}
    </div>
  );
}
