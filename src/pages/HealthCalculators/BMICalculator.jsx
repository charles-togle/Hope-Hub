import { getBMI } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import GenderSelector from '@/components/health-calculators/GenderSelector';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';

export default function BMICalculator () {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('No data');
  const [bmiMedicalInterpretation, setBmiMedicalInterpretation] = useState(
    'Perform a BMI calculation to receive personalized medical interpretation based on your results. This will include information about health risks, recommended actions, and medical considerations specific to your BMI category.',
  );
  const [bmiStatisticalInterpretation, setBmiStatisticalInterpretation] =
    useState(
      'After calculating your BMI, you will see how your result compares to population distributions and statistical norms. This provides context for understanding where your BMI falls within broader health statistics.',
    );

  const { BMI } = CalculatorData;
  const {
    description,
    instructions,
    results,
    statisticalInterpretation,
    medicalInterpretation,
  } = BMI;

  const heightUnits = ['cm', 'ft', 'm'];
  const weightUnits = ['kg', 'lbs'];
  const getBMICategory = bmi => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  const getBMICategoryColor = category => {
    switch (category) {
      case 'Underweight':
      case 'Obese':
        return 'text-red-600';
      case 'Overweight':
        return 'text-orange-500';
      case 'Normal':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  const getBMIInterpretations = category => {
    const categoryKey = category.toLowerCase().replace(' weight', '');
    return {
      medical:
        medicalInterpretation[categoryKey] || 'No interpretation available',
      statistical:
        statisticalInterpretation[categoryKey] || 'No interpretation available',
    };
  };
  const handleCalculate = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight values');
      return;
    }

    const bmi = getBMI(
      parseFloat(height),
      parseFloat(weight),
      heightUnit,
      weightUnit,
    );

    const roundedBmi = Math.round(bmi * 10) / 10;
    const category = getBMICategory(roundedBmi);
    const interpretations = getBMIInterpretations(category);

    setBmiResult(roundedBmi);
    setBmiCategory(category);
    setBmiMedicalInterpretation(interpretations.medical);
    setBmiStatisticalInterpretation(interpretations.statistical);
  };
  const handleClear = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setBmiResult(null);
    setBmiCategory('No data');
    setBmiMedicalInterpretation(
      'Perform a BMI calculation to receive personalized medical interpretation based on your results. This will include information about health risks, recommended actions, and medical considerations specific to your BMI category.',
    );
    setBmiStatisticalInterpretation(
      'After calculating your BMI, you will see how your result compares to population distributions and statistical norms. This provides context for understanding where your BMI falls within broader health statistics.',
    );
  };
  return (
    <>
      <CalculatorDetails
        name='Body Mass Index Calculator'
        details={description}
      />
      <div className='flex flex-row justify-between mt-10 w-[85%]'>
        <CalculatorContainer
          heading='Body Mass Index (BMI) Calculator'
          onCalculate={handleCalculate}
          onClear={handleClear}
        >
          <div className='flex flex-col gap-3'>
            <GenderSelector gender={gender} setGender={setGender} />
            <CalculatorInput label='Age' value={age} setValue={setAge} />
            <CalculatorInput
              label='Height'
              setUnit={setHeightUnit}
              unit={heightUnit}
              setValue={setHeight}
              value={height}
              units={heightUnits}
            />
            <CalculatorInput
              label='Weight'
              setUnit={setWeightUnit}
              unit={weightUnit}
              setValue={setWeight}
              value={weight}
              units={weightUnits}
            />
          </div>
        </CalculatorContainer>
        <Container heading='Instructions'>
          <ol className='list-decimal font-content'>
            {instructions.map((instruction, index) => (
              <li key={`Instruction ${index}`}>{instruction}</li>
            ))}
          </ol>
        </Container>
      </div>
      <div className='flex flex-row mt-10 justify-between w-[85%]'>
        <Container heading='Results'>
          <p className='font-content w-full mr-5 ml-5 text-lg'>
            BMI: {bmiResult || '0.00'} kg/m²{' '}
            <span className={getBMICategoryColor(bmiCategory)}>
              ({bmiCategory})
            </span>
          </p>
        </Container>
        <Container heading='BMI POINTERS' className='w-1/2'>
          <ol className='list-decimal font-content'>
            <li>Healthy Range: 18.5 – 24.9</li>
            <li>Underweight: Below 18.5</li>
            <li>Overweight: 25.0 – 29.9</li>
            <li>Obese: 30.0 and above</li>
          </ol>
          <p className='font-content text-red mt-2'>
            Note: BMI doesn't account for muscle mass or body composition.
          </p>
        </Container>
      </div>
      <div className='w-full flex flex-col gap-10 mt-10'>
        <Content
          content={bmiMedicalInterpretation}
          title='Medical Interpretation'
        />
        <Content
          content={bmiStatisticalInterpretation}
          title='Statistical Interpretation'
        />
      </div>
    </>
  );
}
