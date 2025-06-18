import { getBMI, getWaterIntake } from '@/services/Calculations';
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

export default function WaterIntakeCalculator () {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [weight, setWeight] = useState('');
    const [waterIntakeCategory, setWaterIntakeCategory] = useState('...');
    const [activityLevel, setActivityLevel] = useState('Sedentary (Little to No Exercise)');
    const [intakeResult, setIntakeResult] = useState('');
    // const [intakeCategoryColor, setIntakeCategoryColor] = useState('');
    const [intakeMedicalInterpretation, setIntakeMedicalInterpretation] = useState(
        'Perform a Water Intake calculation to receive personalized medical interpretation based on your results. This will include information about health risks, recommended actions, and medical considerations specific to your BMI category.',
    );
    const [IntakeStatisticalInterpretation, setIntakeStatisticalInterpretation] =
        useState(
        'After calculating your Water Intake, you will see how your result compares to population distributions and statistical norms. This provides context for understanding where your BMI falls within broader health statistics.',
        );

    const { WaterIntake } = CalculatorData;
    const {
        description,
        instructions,
        results,
        statisticalInterpretation,
        medicalInterpretation,
    } = WaterIntake;

    const heightUnits = ['cm', 'ft', 'm'];
    const weightUnits = ['kg', 'lbs'];
    const getWaterIntakeCategory = waterIntake => {
        if (waterIntake < 2.3) return 'below the recommended intake';
        if (waterIntake > 3.7) return 'above the recommended intake';
        return 'within the recommended intake';
    }

    const getWaterIntakeInterpretations = category => {
        const categoryKey = category.toLowerCase().replace(' the recommended intake', '');
        return {
            medical:
                medicalInterpretation[categoryKey] || 'No interpretation available',
            statistical:
                statisticalInterpretation[categoryKey] || 'No interpretation available',
        };
    }

    const getIntakeCategoryColor = categoryKey => {
        switch (categoryKey) {
            case 'below the recommended intake':
            case 'above the recommended intake':
                return 'text-yellow-500 text-lg mb-3';
            case 'within the recommended intake':
                return 'text-green-600 text-lg mb-3';
        }
    };

    const handleCalculate = () => {
        if (!weight || weight <= 0) {
            alert('Please enter a valid weight value.');
            weight = 0;
        }

        const waterIntake = getWaterIntake(
            parseFloat(weight), activityLevel, weightUnit,
        );

        const category = getWaterIntakeCategory(waterIntake);
        const interpretations = getWaterIntakeInterpretations(category);
        
        setIntakeResult(waterIntake);
        setWaterIntakeCategory(category)
        setIntakeMedicalInterpretation(interpretations.medical);
        setIntakeStatisticalInterpretation(interpretations.statistical);

    };

    const handleClear = () => {
        setGender('');
        setAge('');
        setWeight('');
        setIntakeResult('');
        setWaterIntakeCategory('...');
        setIntakeMedicalInterpretation(
        'Perform a Water Intake calculation to receive personalized medical interpretation based on your results. This will include information about health risks, recommended actions, and medical considerations specific to your BMI category.',
        );
        setIntakeStatisticalInterpretation(
        'After calculating your Water Intake, you will see how your result compares to population distributions and statistical norms. This provides context for understanding where your BMI falls within broader health statistics.',
        );
    };

    const activityVariant = [
        'Sedentary (Little to No Exercise)',
        'Light Exercise (1-2 times/week)',
        'Moderate Exercise (3-5 times/week)',
        'High Exercise (6-7 times/week)',
        'Extreme (2x per day)',
    ]

  return(
    <>
        <CalculatorDetails
            name='Water Intake Calculator'
            details={description}
        />

        <RowContainer>
            <CalculatorContainer
                heading='Body Mass Index (BMI) Calculator'
                onCalculate={handleCalculate}
                onClear={handleClear}>
                <div className='flex flex-col gap-3'>
                    <CalculatorInput
                        label='Weight'
                        setUnit={setWeightUnit}
                        unit={weightUnit}
                        setValue={setWeight}
                        value={weight}
                        units={weightUnits}
                    />
                    <RadioButton
                        choices={activityVariant}
                        name='activity-variants'
                        value={activityLevel}
                        setValue={setActivityLevel}
                        text='Activity Level'
                        showBodyFat={false}
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

        <div className='text-sm font-content flex flex-row mt-10 justify-between self-center'>
            <Container heading='Results'>
                <div className="right-0 border-b-2 border-primary-yellow w-25 absolute"/>
                <p className = "mt-5 text-center ">  Estimated Water Intake: </p>
                <p className = "mb-3 text-center "> <p className = {getIntakeCategoryColor(waterIntakeCategory)}>{intakeResult}L</p>You are {waterIntakeCategory}. </p>
            </Container>
        </div>

        <div className='w-full flex flex-col gap-10 mt-10'>
            <Content
            content={intakeMedicalInterpretation}
            title='Medical Interpretation'
            />
            <Content
            content={IntakeStatisticalInterpretation}
            title='Statistical Interpretation'
            />
        </div>
    </>
  )
}
