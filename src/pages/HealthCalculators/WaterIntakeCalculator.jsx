import { getWaterIntake } from '@/services/Calculations';
import { CalculatorData } from '@/utilities/CalculatorData';
import Container from '@/components/health-calculators/Container';
import CalculatorContainer from '@/components/health-calculators/CalculatorContainer';
import { CalculatorDetails } from '@/components/health-calculators/CalculatorDetails';
import { useState } from 'react';
import CalculatorInput from '@/components/health-calculators/CalculatorInput';
import Content from '@/components/health-calculators/Content';
import RowContainer from '@/components/health-calculators/RowContainer';
import RadioButton from '@/components/health-calculators/RadioButtons';

export default function WaterIntakeCalculator () {
    const [weightUnit, setWeightUnit] = useState('kg');
    const [weight, setWeight] = useState('81');
    const [waterIntakeCategory, setWaterIntakeCategory] = useState('...');
    const [activityLevel, setActivityLevel] = useState('Sedentary (Little to No Exercise)');
    const [intakeResult, setIntakeResult] = useState('');
    const [intakeMedicalInterpretation, setIntakeMedicalInterpretation] = useState(
        'After calculating your daily water needs, this section will provide a general medical interpretation of your result. It will explain how your hydration level may affect bodily functions, such as energy, digestion, and circulation. This is intended as educational guidance and not a clinical diagnosis.',
    );
    const [IntakeStatisticalInterpretation, setIntakeStatisticalInterpretation] =
        useState(
        'Once your result is calculated, this section will show how your water intake compares to typical hydration ranges for your weight and activity level. It gives context for whether your current or recommended intake aligns with common population averages.',
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
        'After calculating your daily water needs, this section will provide a general medical interpretation of your result. It will explain how your hydration level may affect bodily functions, such as energy, digestion, and circulation. This is intended as educational guidance and not a clinical diagnosis.',        );
        setIntakeStatisticalInterpretation(
        'Once your result is calculated, this section will show how your water intake compares to typical hydration ranges for your weight and activity level. It gives context for whether your current or recommended intake aligns with common population averages.',        );
    };

    const activityVariant = [
        'Sedentary (Little to No Exercise)',
        'Light Exercise (1-2 times/week)',
        'Moderate Exercise (3-5 times/week)',
        'High Exercise (6-7 times/week)',
        'Extreme (2x per day)',
    ]

    const citations = [
        'Institute of Medicine. (2005). Dietary reference intakes for water, potassium, sodium, chloride, and sulfate. The National Academies Press. https://doi.org/10.17226/10925',
        'Popkin, B. M., D’Anci, K. E., & Rosenberg, I. H. (2010). Water, hydration, and health. Nutrition Reviews, 68(8), 439–458. https://doi.org/10.1111/j.1753-4887.2010.00304.x',    
        'European Food Safety Authority. (2010). Scientific opinion on dietary reference values for water. EFSA Journal, 8(3), 1459. https://doi.org/10.2903/j.efsa.2010.1459',
        'El Milad, H. S., Chughtai, M., & Stoinski, S. (2020). Hydration and kidney stone risk: A systematic review. Nutrition Reviews, 78(7), 535–546. https://doi.org/10.1093/nutrit/nuz082',
    ];

  return(
    <>
        <CalculatorDetails
            name='Water Intake Calculator'
            details={description}
        />

        <RowContainer>
            <CalculatorContainer
                heading='Water Intake Calculator'
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
            <Content
            content = {citations.map((level, index) => (
                <div className='pb-2 text-sm font-content'>
                {level}
                </div>
            ))}
            title='Citations'
            />
            
        </div>
    </>
  )
}
