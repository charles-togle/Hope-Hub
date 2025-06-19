import { getIBW } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import GenderSelector from '@/components/health-calculators/GenderSelector';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';
import RowContainer from '@/components/health-calculators/RowContainer';

export default function IBWCalculator () {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState(null);
  const [ibwMedicalInterpretation, setIbwMedicalInterpretation] = useState(
    'After calculating your Ideal Body Weight (IBW), this section will provide a medical interpretation of what your result may indicate. It will explain how your estimated IBW can be used in clinical contexts, such as for medication dosing, nutritional planning, or assessing health risk. This information is general and not a substitute for medical advice.',
  );
  const [ibwStatisticalInterpretation, setIbwStatisticalInterpretation] =
    useState(
      'Once your IBW is calculated, this section will help you understand how your current weight compares to population-based weight expectations for your height and sex. It provides context on whether you are below, within, or above typical reference ranges used in health assessments.',
    );

  const { BodyFatPercentage } = CalculatorData;
  const {
    description,
    instructions,
    statisticalInterpretation,
    medicalInterpretation,
  } = BodyFatPercentage;

  const heightUnits = ['cm', 'ft', 'm'];
  const weightUnits = ['kg', 'lbs'];

  console.log("Height Unit:", heightUnit);
  
  const handleCalculate = () => {
      if (!height || /* !weight || */ height <= 0 /* || weight <= 0 */) {
      alert('Please enter valid height values');
      return;
    }

    const ibw = getIBW(parseFloat(height), heightUnit, gender,);

    setIbwMedicalInterpretation(IBW.medicalInterpretation);
    setIbwStatisticalInterpretation(IBW.statisticalInterpretation);

    try {
      const result = getIBW(height, heightUnit, gender);
      console.log('IBW Results:', result.IBW);
      console.log('BMI Range:', result.HealthyBMIRange);
      setResults(result);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClear = () => {
    setGender('');
    setAge('');
    setHeight('');
    setIbwResult(null);
    setIbwMedicalInterpretation(
      'After calculating your Ideal Body Weight (IBW), this section will provide a medical interpretation of what your result may indicate. It will explain how your estimated IBW can be used in clinical contexts, such as for medication dosing, nutritional planning, or assessing health risk. This information is general and not a substitute for medical advice.',
    );
    setIbwStatisticalInterpretation(
      'Once your IBW is calculated, this section will help you understand how your current weight compares to population-based weight expectations for your height and sex. It provides context on whether you are below, within, or above typical reference ranges used in health assessments.',
    );
  };

  return (
    <>
      <CalculatorDetails
        name='Ideal Body Weight Calculator'
        details={description}
      />
      <RowContainer>
        <CalculatorContainer
          heading='Ideal Body Weight (IBW) Calculator'
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
          </div>
        </CalculatorContainer>
        <Container heading='Instructions'>
          <div className=''>
            <ol className='list-decimal font-content'>
              {instructions.map((instruction, index) => (
                <li key={`Instruction ${index}`}>{instruction}</li>
              ))}
            </ol>
          </div>
        </Container>
      </RowContainer>

      <div className='text-sm font-content flex flex-row mt-10 justify-between self-center'>
        <Container heading='Results'>
          <div className="right-0 border-b-2 border-primary-yellow w-35 absolute"/>
          <div className='w-full border-b-2 border-primary-blue pb-2 text-center'>
            <p className='p-2 pt-5 text-lg'> Ideal weight based on popular formulas:</p>
          </div>

          <table className='border-collapse '> 
            <tr className=''>
              <th className=''>
                <p className='text-left mt-8 text-red-400'> Formula </p>
                <div className="border-b-2 mb-3 border-primary-blue w-10"/>
              </th>
              <th className = "pl-3 w-1/2">
                <p className='text-left mt-8 text-green-400'> Ideal Weight </p>
                <div className="border-b-2 mb-3 border-primary-blue w-10"/>
              </th>
            </tr>

            <tbody>
              {results && (
                <>
                {Object.entries(results.IBW).map(([formula, value]) =>(
                  <tr key = {formula}>
                    <td className='pl-3 text-lg font-content border-r-2 border-primary-yellow'> 
                      {formula}
                    </td>
                    <td className = 'pl-6 text-lg'>
                      {value} kg
                    </td>
                  </tr>
                ))}
                </>
              )}

              {results?.HealthyBMIRange && (
                <tr className='text-lg   font-content' >
                <td className = "p-3"> 
                  Healthy Weight Range:
                </td>
                <td className = "pl-6">
                  
                    <p> {results.HealthyBMIRange.min} - {results.HealthyBMIRange.max} kg </p>
                  
                </td>
                </tr>
              )}
            </tbody>
          </table>          
        </Container>

      </div>
      <div className='w-full flex flex-col gap-10 mt-10'>
        <Content
          content={ibwMedicalInterpretation}
          title='Medical Interpretation'
        />
        <Content
          content={ibwStatisticalInterpretation}
          title='Statistical Interpretation'
        />
      </div>
    </>
  );
}
