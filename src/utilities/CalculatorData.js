//get from calculator.net

export const CalculatorData = {
  BMI: {
    description:
      '1st Paragraph placeholder --- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    instructions: [
      'Choose your gender',
      'Input your age in years',
      'Input your height in your desired unit',
      'Input your weight in your derired unit',
      'Click calculate',
      'Read results',
    ],
    statisticalInterpretation: {
      underweight: 'Lower than 5th percentile of population distribution',
      normal: 'Statistically typical for a healthy adult population',
      overweight: 'Above 85th percentile in many populations',
      obese: 'Above 95th percentile in most populations',
    },
    medicalInterpretation: {
      underweight:
        'May indicate malnutrition, nutrient deficiencies, or underlying illness; increased risk of osteoporosis, infertility, and weakened immunity.',
      normal:
        'Lowest risk of heart disease, diabetes, and other chronic illnesses. Suggests balanced nutrition and appropriate body fat.',
      overweight:
        'Elevated risk for hypertension, type 2 diabetes, joint issues, and cardiovascular disease. Often a precursor to obesity.',
      obese:
        'Strongly associated with chronic diseases including type 2 diabetes, heart disease, stroke, sleep apnea, and certain cancers. Life expectancy may be reduced.',
    },
  },
  //medical and statistical interpretation is from https://chatgpt.com/share/683d8381-6e78-800c-a55d-8ea030a1d742
  BMR: {
    description:
      '1st Paragraph placeholder --- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    instructions: [
      'Choose your gender',
      'Input your age in years',
      'Input your height in your desired unit',
      'Input your weight in your dersired unit',
      "Pick your desired formula (default is Mifflin St Jeor's formula)",
      'Pick your activity level (default is Moderate: exercise 4-5 times/week)',
      'Click calculate',
      'Read results',
    ],
    statisticalInterpretation: {
      underweight: 'Lower than 5th percentile of population distribution',
      normal: 'Statistically typical for a healthy adult population',
      overweight: 'Above 85th percentile in many populations',
      obese: 'Above 95th percentile in most populations',
    },
    medicalInterpretation: {
      underweight:
        'May indicate malnutrition, nutrient deficiencies, or underlying illness; increased risk of osteoporosis, infertility, and weakened immunity.',
      normal:
        'Lowest risk of heart disease, diabetes, and other chronic illnesses. Suggests balanced nutrition and appropriate body fat.',
      overweight:
        'Elevated risk for hypertension, type 2 diabetes, joint issues, and cardiovascular disease. Often a precursor to obesity.',
      obese:
        'Strongly associated with chronic diseases including type 2 diabetes, heart disease, stroke, sleep apnea, and certain cancers. Life expectancy may be reduced.',
    },
  },
};
