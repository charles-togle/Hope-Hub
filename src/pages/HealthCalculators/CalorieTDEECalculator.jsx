import { getTDEE } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import GenderSelector from '@/components/health-calculators/GenderSelector';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';
import RadioButton from '@/components/health-calculators/RadioButtons';

export default function TDEECalculator () {
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('20');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('81');
  const [activityType, setactivityType] = useState('Sedentary (Little to No Exercise)');
  const [tdeeResult, setTdeeResult] = useState(null);

  // Activity level states
  const [sedentaryLevel, setSedentaryLevel] = useState(1.2);
  const [lightExerciseLevel, setLightExerciseLevel] = useState(1.375);
  const [moderateExerciseLevel, setModerateExerciseLevel] = useState(1.55);
  const [heavyExerciseLevel, setHeavyExerciseLevel] = useState(1.725);
  const [athleteLevel, setAthleteLevel] = useState(2.0);
  const { TDEE } = CalculatorData;
  const {
    description = '',
    instructions,
    statisticalInterpretation,
    medicalInterpretation,
  } = TDEE;
  const activityTypes = [
    'Sedentary (Little to No Exercise)',
    'Light Exercise (1-2 times/week)',
    'Moderate Exercise (3-5 times/week)',
    'Heavy Exercise (6-7 times/week)',
    'Athlete (2x per day)',
  ];

  const activityLevels = [
    { label: 'Sedentary (Little to No Exercise)', value: sedentaryLevel },
    { label: 'Light Exercise (1-2 times/week)', value: lightExerciseLevel },
    { label: 'Moderate Exercise (3-5 times/week)', value: moderateExerciseLevel },
    {
      label: 'Heavy Exercise (6-7 times/week)',
      value: heavyExerciseLevel,
    },
    {
      label: 'Athlete (2x per day)', value: athleteLevel,
    },
  ];

  const heightUnits = ['cm', 'ft', 'm'];
  const weightUnits = ['kg', 'lbs'];

  const handleCalculate = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight values');
      return;
    }

    let tdee;
    console.log(gender);
    try {
      tdee = getTDEE(
        gender,
        age,
        height,
        weight,
        activityType,
        heightUnit,
        weightUnit,
      );
    } catch (e) {
      alert(e);
      return;
    }

    const { TDEE, DailyCalories } = tdee;

    setSedentaryLevel(DailyCalories['Sedentary (Little to No Exercise)']);
    setLightExerciseLevel(DailyCalories['Light Exercise (1-2 times/week)']);
    setModerateExerciseLevel(DailyCalories['Moderate Exercise (3-5 times/week)']);
    setHeavyExerciseLevel(DailyCalories['Heavy Exercise (6-7 times/week)']);
    setAthleteLevel(DailyCalories['Athlete (2x per day)']);
    setTdeeResult(TDEE);
    console.log(TDEE);
  };
  const handleClear = () => {
    setGender('');
    setAge('');
    setHeight('');
    setWeight('');
    setactivityType('Sedentary (Little to No Exercise)');
  };
  return (
    <>
      <CalculatorDetails
        name='Basal Metabolic Rate Calculator'
        details={description}
      />
      <div className='flex flex-row justify-between gap-3 mt-10 w-[90%]'>
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
                choices={activityTypes}
                name='activity-type'
                value={activityType}
                setValue={setactivityType}
                text='Exercise Level'
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
      </div>
      <div className='flex flex-row mt-10 justify-between w-[90%]'>
        <Container heading='Results'>
          <p className='font-content w-full px-5 mr-5 ml-5 text-lg'>
            TDEE = {tdeeResult} Calories / day
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
      </div>
      <div className='w-full flex flex-col gap-10 mt-10'>
        {/* <Content
          content={tdeeMedicalInterpretation}
          title='Medical Interpretation'
        />
        <Content
          content={tdeeStatisticalInterpretation}
          title='Statistical Interpretation'
        /> */}
      </div>
    </>
  );
}
