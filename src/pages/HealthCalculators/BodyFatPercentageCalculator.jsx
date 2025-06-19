import { getBMI, getBodyFatPercentage, getWaterIntake } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import GenderSelector from '@/components/health-calculators/GenderSelector';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';
import RowContainer from '@/components/health-calculators/RowContainer';
import RadioButton from '@/components/health-calculators/RadioButtons';

export default function BodyFatPercentageCalculator () {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('25');
    const [height, setHeight] = useState('165');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weight, setWeight] = useState('60');
    const [weightUnit, setWeightUnit] = useState('kg');
    
    const [neck, setNeck] = useState('34');
    const [waist, setWaist] = useState('70');
    const [hips, setHips] = useState('100');
    const [neckUnit, setNeckUnit] = useState('cm');
    const [waistUnit, setWaistUnit] = useState('cm');
    const [hipsUnit, setHipsUnit] = useState('cm');

    const [results, setResults] = useState(null);
    const [bodyFatPercentageCategory, setBodyFatPercentageCategory] = useState('...');
    const [activityLevel, setActivityLevel] = useState('Sedentary (Little to No Exercise)');
    const [BodyFatPercentageResult, setBodyFatPercentageResult] = useState('');
    const [percentCategoryLevel, setPercentCategoryLevel] = useState('');
    const [FatPercentageMedicalInterpretation, setFatPercentageMedicalInterpretation] = useState(
        'Once you calculate your result, this section will provide a general medical interpretation of your body fat percentage. It will explain what your level may mean for your health, including potential benefits or risks, based on established clinical guidelines. Always consult a healthcare provider for personal advice.',
    );
    const [FatPercentageStatisticalIntepretation, setFatPercentageStatisticalIntepretation] =
        useState(
        'After calculating your body fat percentage, this section will show how your result compares to typical ranges in the general population. It helps you understand where your number falls statistically — whether it\'s common, rare, or above average — and offers context based on observed health trends.',
        );

    const { BodyFatPercentage } = CalculatorData;
    const {
        description,
        instructions,
        statisticalInterpretation,
        medicalInterpretation,
    } = BodyFatPercentage;

    const heightUnits = ['cm', 'ft', 'm'];
    const neckUnits = ['cm', 'ft', 'm'];
    const waistUnits = ['cm', 'ft', 'm'];
    const hipsUnits = ['cm', 'ft', 'm'];
    const weightUnits = ['kg', 'lbs'];
    
    const getBodyFatPercentageCategory = (gender, bodyFatPercentage) => {
        switch(gender){
        case 'female': case 'male':
            if(bodyFatPercentage > 69) return "Obese";
            if(bodyFatPercentage > 44) return "Average";
            if(bodyFatPercentage > 26) return "Fitness";
            if(bodyFatPercentage > 10) return "Athletes";
            if(bodyFatPercentage >= 4) return "Essential";
            return "Below";
        default:
            //throw new Error("Gender must be 'male' or 'female'.");
            break;
        }
    };

    const getFatPercentageIntepretations = category => {
        const categoryKey = category;
        return {
            medical:
                medicalInterpretation[categoryKey] || 'No interpretation available',
            statistical:
                statisticalInterpretation[categoryKey] || 'No interpretation available',
        };
    }

const handleCalculate = () => {
  if (!weight || weight <= 0) {
    alert('Please enter a valid weight value.');
    return;
  }

  const bodyFatPercentage = getBodyFatPercentage(
    age, gender, parseFloat(height), parseFloat(weight),
    parseFloat(neck), parseFloat(waist), parseFloat(hips),
    heightUnit, weightUnit, neckUnit, waistUnit, hipsUnit,
  );

  const raw = bodyFatPercentage.results["Body Fat: U.S. Navy Method"];
  const category = getBodyFatPercentageCategory(gender, parseFloat(raw));
  const interpretations = getFatPercentageIntepretations(category);

  console.log("US %:", raw);
  console.log("Resolved category:", category);
  console.log("Interpretations:", interpretations);
  console.log("Raw Body Fat (US Method):", raw, typeof raw);

  setResults(bodyFatPercentage);
  setBodyFatPercentageResult(raw);
  setBodyFatPercentageCategory(category);
  setFatPercentageMedicalInterpretation(interpretations.medical);
  setFatPercentageStatisticalIntepretation(interpretations.statistical);
};


    const raw =  results?.results?.["Body Fat: U.S. Navy Method"].replace('%', ' ');
    const rawNum = parseFloat(raw);
    const rawPercent = Math.min(Math.max(raw, 0), 100);
    console.log("navyValue", rawNum);

    const handleClear = () => {
        setGender('');
        setAge('');
        setWeight('');
        setHeight('');
        setHips('');
        setWaist('');
        setNeck('');
        setBodyFatPercentageResult('');
        setBodyFatPercentageCategory('...');
        setFatPercentageMedicalInterpretation(
        'Once you calculate your result, this section will provide a general medical interpretation of your body fat percentage. It will explain what your level may mean for your health, including potential benefits or risks, based on established clinical guidelines. Always consult a healthcare provider for personal advice.',        );
        setFatPercentageStatisticalIntepretation(
        'After calculating your body fat percentage, this section will show how your result compares to typical ranges in the general population. It helps you understand where your number falls statistically — whether it\'s common, rare, or above average — and offers context based on observed health trends.',
        );
    };

  return(
    <>
        <CalculatorDetails
            name='Body Fat Percentage Calculator'
            details={description}
        />

        <RowContainer>
            <CalculatorContainer
                heading='Body Fat Percentage Calculator'
                onCalculate={handleCalculate}
                onClear={handleClear}>
                <div className='flex flex-col gap-3'>
                    <GenderSelector gender = {gender} setGender={setGender}/>
                    <CalculatorInput label= 'age' value={age} setValue={setAge}/>
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
                    <CalculatorInput
                        label='Waist'
                        setUnit={setWaistUnit}
                        unit={waistUnit}
                        setValue={setWaist}
                        value={waist}
                        units={waistUnits}
                    />
                    <CalculatorInput
                        label='Neck'
                        setUnit={setNeckUnit}
                        unit={neckUnit}
                        setValue={setNeck}
                        value={neck}
                        units={neckUnits}
                    />
                    <CalculatorInput
                        label='Hips'
                        setUnit={setHipsUnit}
                        unit={hipsUnit}
                        setValue={setHips}
                        value={hips}
                        units={hipsUnits}
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

        </RowContainer>
        <RowContainer>
                <Container heading='Results'>
                    <span className='mt-5 font-content text-xl text-center font-bold'> Body Fat: {raw}% </span>
                    <div className="mt-2 border-b-2 border-primary-blue w-25 self-center"/>
                    <div className="mt-5 w-[100%] h-16 rounded overflow-hidden flex relative">
                        <div className="h-8 shadow-md bg-red-800 w-[4%]"/> {/* Below essential */}
                        <div className="h-8 shadow-md bg-yellow-400 w-[6%]"/> {/* Essential */}
                        <div className="h-8 shadow-md bg-green-400 w-[16%]"/> {/* Athlete */}
                        <div className="h-8 shadow-md bg-green-600 w-[18%]"/> {/* Fitness */}
                        <div className="h-8 shadow-md bg-yellow-400 w-[25%]"/> {/* Average */}
                        <div className="h-8 shadow-md bg-red-800 w-[31%]"/> {/* Obese */}
                        <span style={{ marginLeft: `${rawPercent}%` }} className = "w-auto mt-5 absolute font-extrabold text-3xl text-shadow-black">◣</span>
                    </div>

                    {/* <span className = {getPercentCategoryLevel(BodyFatPercentageResult)}> ◣ </span> */}

                    <table className='border-collapse font-content text-sm'>
                        <tbody>
                            {results?.results && (
                            <td className="list-disc list-inside space-y-1">
                                {Object.entries(results.results).map(([label, value]) => (
                                <tr key={label}>
                                    <td className='p-2'>
                                        {label}
                                    </td>
                                    <td className='p-2'>
                                        <span className='ml-10'> {value} </span>
                                    </td>
                                </tr>
                                ))}
                            </td>
                            )}
                        </tbody>
                    </table>
                    <div className="right-0 border-b-2 border-primary-yellow w-25 absolute"/>
                </Container>


            <Container heading = 'Data Reference'>
                <div className='font-content text-sm'>
                    <div className='relative grid grid-cols-2 fr gap-3 items-center'>
                        <span className='flex mb-2 text-red-800'> less than 4% <br/> Below Essential</span> <div className="h-6 flex shadow-md bg-red-800 w-[4%]"/>
                        <span className='flex mb-2 text-yellow-400 '> 4% - 10% <br/> Essential </span> <div className="h-6 shadow-md bg-yellow-400 w-[6%]"/>
                        <span className='flex mb-2 text-green-400 '> 11% - 26% <br/> Athlete </span> <div className="h-6 shadow-md bg-green-400 w-[16%]"/>
                        <span className='flex mb-2 text-green-600 '> 27% - 44% <br/> Fitness </span> <div className="h-6 shadow-md bg-green-600 w-[18%]"/>
                        <span className='flex mb-2 text-yellow-400'> 45% - 69% <br/> Average </span> <div className="h-6 shadow-md bg-yellow-400 w-[25%]"/> 
                        <span className='flex mb-2 text-red-800'> more than 70% <br/> Obese </span> <div className="h-6 shadow-md bg-red-800 w-[31%]"/>
                    </div>  
                </div>

            </Container>
        </RowContainer>

        <div className='w-full flex flex-col gap-10 mt-10'>
            <Content
            content={FatPercentageMedicalInterpretation}
            title='Medical Interpretation'
            />
            <Content
            content={FatPercentageStatisticalIntepretation}
            title='Statistical Interpretation'
            />
        </div>
    </>
  )
}
