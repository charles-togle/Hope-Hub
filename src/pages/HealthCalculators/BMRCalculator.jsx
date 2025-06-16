import { getBMR } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import GenderSelector from '@/components/health-calculators/GenderSelector';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';
import RadioButton from '@/components/health-calculators/RadioButtons';
import RowContainer from '@/components/health-calculators/RowContainer';
import ResultGroup from '@/components/health-calculators/ResultGroup';

export default function BMRCalculator () {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('20');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('81');
  const [formulaVariant, setFormulaVariant] = useState('Mifflin St Jeor');
  const [bodyFat, setBodyFat] = useState(20);
  const [bmrResult, setBmrResult] = useState(null);

  // Activity level states
  const [sedentaryLevel, setSedentaryLevel] = useState(1.2);
  const [lightActiveLevel, setLightActiveLevel] = useState(1.375);
  const [moderateActiveLevel, setModerateActiveLevel] = useState(1.55);
  const [veryActiveLevel, setVeryActiveLevel] = useState(1.725);
  const [extremelyActiveLevel, setExtremelyActiveLevel] = useState(1.9);
  const [superActiveLevel, setSuperActiveLevel] = useState(2.0);
  const { BMR } = CalculatorData;
  const {
    description,
    instructions,
    statisticalInterpretation,
    medicalInterpretation,
  } = BMR;
  const formulaVariants = [
    'Mifflin St Jeor',
    'Revised Harris-Benedict',
    'Katch-McArdle',
  ];

  const activityLevels = [
    { label: 'Sedentary: little or no exercise', value: sedentaryLevel },
    { label: 'Exercise 1-3 times/week', value: lightActiveLevel },
    { label: 'Exercise 4-5 times/week', value: moderateActiveLevel },
    {
      label: 'Daily exercise or intense exercise 3-4 times/week',
      value: veryActiveLevel,
    },
    { label: 'Intense exercise 6-7 times/week', value: extremelyActiveLevel },
    {
      label: 'Very intense exercise daily, or physical job',
      value: superActiveLevel,
    },
  ];

  const heightUnits = ['cm', 'ft', 'm'];
  const weightUnits = ['kg', 'lbs'];

  const handleCalculate = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight values');
      return;
    }

    let bmr;
    console.log(gender);
    try {
      bmr = getBMR(
        gender,
        age,
        height,
        weight,
        formulaVariant,
        bodyFat,
        heightUnit,
        weightUnit,
      );
    } catch (e) {
      alert(e);
      return;
    }

    const { BMR, DailyCalories } = bmr;

    setSedentaryLevel(DailyCalories.sedentary);
    setLightActiveLevel(DailyCalories['lightly active']);
    setModerateActiveLevel(DailyCalories['moderately active']);
    setVeryActiveLevel(DailyCalories['very active']);
    setExtremelyActiveLevel(DailyCalories['extra active']);
    setSuperActiveLevel(DailyCalories['super active']);
    setBmrResult(BMR);
    console.log(BMR);
  };
  const handleClear = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setBodyFat(20);
    setFormulaVariant('Mifflin St Jeor');
  };

  const sampleMergedResult = {
    'Mild Weight Loss': 0.0,
    'Weight Loss': 0.0,
    'Extreme Weight Loss': 0.0,
  };
  return (
    <>
      <CalculatorDetails
        name='Basal Metabolic Rate Calculator'
        details={description}
      />
      <RowContainer>
        <CalculatorContainer
          heading='Basal Metabolid Rate (BMR) Calculator'
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
            />{' '}
            <div className='z-3 bg-white relative'>
              <RadioButton
                choices={formulaVariants}
                name='formula-variants'
                value={formulaVariant}
                setValue={setFormulaVariant}
                text='BMR Estimation Formula'
                showBodyFat={true}
                bodyFatValue={bodyFat}
                onBodyFatChange={e => setBodyFat(e.target.value)}
              />
            </div>
          </div>
        </CalculatorContainer>
        <Container heading='Instructions'>
          <ol className='list-decimal font-content'>
            {instructions.map((instruction, index) => (
              <li key={`Instruction ${index}`}>{instruction}</li>
            ))}
          </ol>
        </Container>
      </RowContainer>
      <RowContainer>
        <ResultGroup variant='weight-loss' result={sampleMergedResult} />
        <ResultGroup variant='weight-gain' result={sampleMergedResult} />
      </RowContainer>
      <RowContainer>
        <Container heading='Results'>
          <p className='font-content w-full mr-5 ml-5 text-lg text-center'>
            BMR = {bmrResult} Calories / day
          </p>
        </Container>{' '}
        <Container heading='BMR Caloric Levels' className='w-1/2'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b-2 border-primary-yellow'>
                <th className='text-left py-2 px-3 font-content font-semibold text-sm'>
                  Activity Level
                </th>
                <th className='text-center py-2 px-3 font-content font-semibold text-sm'>
                  Multiplier
                </th>
              </tr>
            </thead>
            <tbody>
              {activityLevels.map((level, index) => (
                <tr key={index}>
                  <td className='py-2 px-3 text-sm font-content border-r-2 border-primary-yellow'>
                    {level.label}
                  </td>
                  <td className='py-2 px-3 text-center'>
                    <span className='font-medium text-primary-blue'>
                      {level.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </RowContainer>
      <div className='w-full flex flex-col gap-10 mt-10'>
        {/* <Content
          content={bmiMedicalInterpretation}
          title='Medical Interpretation'
        />
        <Content
          content={bmiStatisticalInterpretation}
          title='Statistical Interpretation'
        /> */}
      </div>
    </>
  );
}
