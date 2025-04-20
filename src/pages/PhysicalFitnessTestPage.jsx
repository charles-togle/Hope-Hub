import PhysicalFitnessTest from '@/components/PhysicalFitnessTest';
import PageHeading from '@/components/PageHeading';
import { useParams } from 'react-router-dom';

export function PhysicalFitnessTestPage() {
  const { testIndex } = useParams();
  return (
    <div id="physical-fitness-test-container">
      <PageHeading text="Physical Fitness Test"></PageHeading>
      <div id="physical-fitness-content" className='content-container w-[90%]!'>
        <PhysicalFitnessTest index={testIndex}></PhysicalFitnessTest>
      </div>
    </div>
  );
}
