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
  TDEE: {
    description:
      '1st Paragraph placeholder --- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    instructions: [
      'Choose your gender',
      'Input your age in years',
      'Input your height in your desired unit',
      'Input your weight in your dersired unit',
      "Pick your desired formula (default is Mifflin St Jeor's formula",
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
  IBW: {
    description:
      'Ideal Body Weight (IBW) is a calculated estimate of what a person should weigh based on height and sex, using medical formulas. It helps provide a reference point for healthy body weight and is often used in clinical settings to guide dosing, nutrition, and risk assessment. IBW does not account for muscle mass or body composition — it’s a general benchmark, not a personal diagnosis. IBW is used in clinical settings as a guideline for medication dosing, ventilator settings, and assessing nutritional needs. It is not a diagnosis, but rather a reference point for estimating healthy physiological function, particularly in underweight or critically ill patients. ',
    instructions: [
      'Choose your gender (male or female).',
      'Enter your age in years (optional).',
      'Enter your height in your prefered unit (Ft, Cm, M). You can select units by selecting the drop-down icon.',
      'Click calculate.',
      'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
    ],
    statisticalInterpretation: 'Ideal Body Weight (IBW) is most commonly associated with the lowest mortality and best long-term health outcomes across population studies. It reflects average body weights observed in healthy individuals of a given height and sex.',
    medicalInterpretation: 'Weights significantly below Ideal Body Weight may suggest undernutrition, muscle loss, or chronic illness, especially if unintentional. This could increase the risk of weakened immunity, fatigue, and complications during medical treatment. On the other hand, weights significantly above Ideal Body Weight may indicate excess body fat or a higher risk of metabolic conditions like type 2 diabetes, high blood pressure, or cardiovascular disease. It may also strain joints and organs over time.',
  },

};
