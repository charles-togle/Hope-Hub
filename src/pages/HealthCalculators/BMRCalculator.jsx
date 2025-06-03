import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';

export default function BMRCalculator () {
  const description =
    'The Basal Metabolic Rate (BMR) Calculator estimates the number of calories your body needs to perform basic life-sustaining functions while at rest. This includes breathing, circulation, cell production, nutrient processing, and brain function.';

  return (
    <section id='calorie-calculator' className='parent-container'>
      <div className='content-container w-[85%] pb-20'>
        <CalculatorDetails
          name='Basal Metabolic Rate (BMR) Calculator'
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
