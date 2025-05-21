import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import Container from './Container';

export default function Statistics ({ progress, type }) {
  let percentage = Math.round((progress.completed / progress.total) * 100);
  if (isNaN(percentage)) percentage = 0;
  const chartData = [{ name: 'Progress', value: percentage, fill: 'green' }];

  return (
    <div id='statistics' className='w-full'>
      <Container
        id='percentage'
        className='flex flex-row-reverse justify-center items-center gap-10'
      >
        <h2 className='text-lg font-semibold'>{type} Overall Progress</h2>
        <div className='relative flex items-center justify-center'>
          <RadialBarChart
            width={100}
            height={100}
            cx='50%'
            cy='50%'
            innerRadius='100%'
            outerRadius='90%'
            barSize={10}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar background dataKey='value' cornerRadius={10} />
          </RadialBarChart>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <p className='text-lg font-bold'>{percentage}%</p>
          </div>
        </div>
      </Container>
      <Container
        id='count'
        className='flex flex-col items-start pl-15 gap-5 text-lg pt-10 pb-10'
      >
        {[
          {
            label: 'Completed',
            value: progress.completed,
            color: 'green',
          },
          {
            label: 'Pending',
            value: progress.pending,
            color: 'primary-yellow',
          },
          { label: 'Incomplete', value: progress.incomplete, color: 'red' },
        ].map(({ label, value, color }) => (
          <p key={label} className={`text-${color} text-base font-semibold`}>
            <span className='mr-7 text-lg font-bold!'>{value}</span>
            {label}
          </p>
        ))}
      </Container>
    </div>
  );
}
