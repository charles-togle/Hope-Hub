import PageHeading from '@/components/PageHeading';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';

export default function CalorieCalculator () {
  const description =
    'The Calorie Calculator helps you determine how many calories you should consume daily based on your goals, whether you want to maintain, lose, or gain weight. It considers your activity level, age, gender, and other factors.';

  return (
    <section id='calorie-calculator' className='parent-container'>
      <div className='content-container w-[85%] pb-20'>
        <CalculatorDetails
          name='Daily Calorie Calculator'
          details={description}
        />
        <div className='flex items-center h-96'>
          <div className='text-center'>
            <h2 className='text-2xl font-content text-secondary-dark-blue mb-4'>
              Calorie Calculator Coming Soon
            </h2>
            <p className='text-gray-600 font-content'>
              This calculator is currently under development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
