//get from calculator.net

export const CalculatorData = {
  BMI: {
    description:
      'The Body Mass Index (BMI) Calculator estimates whether your weight is appropriate for your height. It uses a simple formula — weight divided by height squared — to classify your body size into categories like underweight, normal, overweight, or obese. BMI is commonly used in public health and clinical settings as a general indicator of potential weight-related health risks. A BMI within the “normal” range is associated with a lower likelihood of chronic conditions such as heart disease, diabetes, and high blood pressure. Higher or lower values may suggest the need for lifestyle changes or further medical evaluation. Although BMI is not a direct measure of body fat or overall health, it is a useful screening tool that can help guide awareness and decisions about physical well-being.',
    instructions: [
      'Choose your gender',
      'Input your age in years',
      'Input your height in your desired unit',
      'Input your weight in your derired unit',
      'Click calculate',
      'Read results',
    ],
    statisticalInterpretation: {
      underweight: 'People in this BMI range represent a small portion of the population and are more likely to experience nutrient deficiencies, especially in settings with limited access to food or underlying health issues. Statistically, underweight status is associated with increased risks of frailty, fatigue, and weakened immunity.',
      normal: 'This range includes the majority of healthy adults and is associated with the lowest overall rates of chronic disease and mortality in population studies. People in this range typically have fewer weight-related health complications.',
      overweight: 'A significant portion of adults fall into this range. Statistically, being overweight increases the likelihood of developing metabolic conditions, especially when combined with low physical activity or poor dietary habits.',
      obese: 'Obesity is increasingly common in many populations and is strongly linked with higher rates of health complications and premature death. It is associated with significantly increased risks of cardiovascular disease, type 2 diabetes, and certain cancers.',
    },
    medicalInterpretation: {
      underweight:
        'Being underweight can indicate inadequate body fat or muscle mass, which may lead to reduced immune function, hormonal imbalance, and bone loss. It can also result from medical conditions, eating disorders, or malnutrition. Further evaluation may be needed to determine the cause.',
      normal:
        'A BMI in the normal range suggests a healthy weight relative to height and is generally linked with lower risk for conditions such as type 2 diabetes, heart disease, and hypertension. However, overall health still depends on lifestyle factors like diet, activity, and genetics.',
      overweight:
        'Overweight status may place extra strain on joints, the cardiovascular system, and insulin regulation. It can be an early warning sign of increased risk for chronic diseases such as high blood pressure, sleep apnea, and prediabetes.',
      obese:
        'Obesity is a medical condition that often involves excess body fat, metabolic imbalance, and systemic inflammation. It can impair organ function, mobility, and mental health. Clinical guidance is typically recommended to manage weight through lifestyle changes or medical treatment.',
    },
  },
  //medical and statistical interpretation is from https://chatgpt.com/share/683d8381-6e78-800c-a55d-8ea030a1d742
  BMR: {
    description:
      'The Basal Metabolic Rate (BMR) Calculator estimates the number of calories your body needs to maintain basic functions while at rest — such as breathing, circulating blood, and regulating temperature. This is the minimum energy your body requires to stay alive and functioning, even if you were completely inactive all day. BMR is the foundation for calculating total daily calorie needs. When combined with your activity level, it helps determine how many calories you need to maintain, lose, or gain weight. Factors like age, sex, weight, and height all influence your BMR, since they affect your body’s energy use. This tool is especially useful for planning nutrition and fitness goals, as it gives you a baseline for understanding how your body burns energy throughout the day.',
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
  WaterIntake: {
    description: 'The Daily Water Intake Calculator estimates how much water you should drink each day based on your weight and activity level. These two inputs are among the most important for determining hydration needs. By entering this information, you’ll receive a personalized water intake recommendation designed to support everyday health and well-being. This calculator uses a widely accepted method: estimating baseline fluid needs at approximately 33 milliliters per kilogram of body weight, then adjusting based on your level of physical activity. The more you exercise or sweat, the more water your body requires to maintain optimal balance. Using this tool can help you become more aware of how your daily habits influence hydration. It promotes better energy levels, physical performance, and general health by encouraging consistent fluid intake tailored to your body. While the recommendation is not a strict rule, it can be a helpful starting point for building better hydration habits.',
    instructions: [
      'Enter your weight in your prefered unit (kg, lbs). You can select units by selecting the drop-down icon.',
      'Choose the option that best describes your typical weekly physical activity.',
      'Click calculate.',
      'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
    ],
    statisticalInterpretation: {
      below: 'Your estimated water intake is below the average range typically observed in healthy adults of your weight and activity level. Statistically, individuals with lower fluid intake may report more frequent fatigue, reduced concentration, and increased likelihood of dehydration symptoms.',
      within: 'Your water intake falls within the range most commonly associated with healthy hydration patterns across the general population. Statistically, this level of fluid intake aligns with lower risks of dehydration-related symptoms and supports normal daily functioning.',
      above: 'Your water intake exceeds the average level observed in similarly active individuals of your body weight. Statistically, some highly active or heat-exposed individuals may fall into this range without adverse effects, though most do not require this volume daily.',
    },
    medicalInterpretation: {
      below:
        'Inadequate hydration can impair body functions such as temperature regulation, digestion, and kidney function. Chronic underhydration may increase the risk of headaches, constipation, and urinary tract issues. If unintentional, low intake may signal poor dietary habits or restricted fluid access.',
      within:
        'Adequate hydration supports healthy circulation, digestion, brain function, and physical performance. Maintaining water intake within this range generally promotes balanced fluid levels without overburdening the kidneys. It reflects a healthy habit that supports long-term wellness.',
      above:
        'While excess water is typically excreted by healthy kidneys, very high intake may rarely lead to electrolyte imbalance (e.g. hyponatremia) if extreme. For most healthy individuals, slightly elevated intake is not harmful, especially in hot climates or during intense physical activity. Caution is advised only if fluid intake is excessive or medically restricted.',
    },
  },
  BodyFatPercentage: {
  description: 'The Body Fat Percentage Calculator estimates how much of your body weight is made up of fat versus lean mass. By using basic body measurements — including height, weight, waist, neck, and hips (for females) — it applies a recognized formula to provide a reliable estimate of your body fat percentage. This tool is useful for understanding body composition beyond what BMI alone can show. While BMI measures weight in relation to height, body fat percentage reveals more about your health, fitness, and physical makeup. It helps identify whether you fall into categories such as athletic, average, or at risk for obesity-related conditions. Your result will include both a medical and statistical interpretation, offering insights into what your body fat percentage means for your health and how it compares to population norms. This can support informed decisions about fitness, nutrition, and long-term wellness planning.',
  instructions: [
    'Select either male or female.',
    'Enter your age in years.',
    'Enter your height in your prefered unit (m, cm, ft). You can select units by selecting the drop-down icon.',
    'Enter your weight in your prefered unit (kg, lbs).',
    'Enter your waist and neck circumference in your prefered unit (m, cm, ft).',
    'For females: Measure around the widest part of your hips and buttocks.',
    'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
  ],
  statisticalInterpretation: {
    Essential: 'This range is most common among competitive athletes or genetically lean individuals. It represents the minimum body fat needed for basic physiological functions.',
    Athletes: 'This range reflects a highly active or fit population. It aligns with body fat percentages commonly seen in trained athletes or fitness enthusiasts.',
    Fitness: 'This category captures the average to above-average population range, especially among adults who are active but not highly athletic. It is statistically common in both fit and moderately sedentary individuals.',
    Average:
      'This body fat range is statistically high compared to recommended levels and suggests excess fat accumulation in the general population.',
    Obese:
      'Body fat over 70% is extremely uncommon and significantly above typical population norms. It reflects an advanced stage of excess adiposity.',
    Below:
      'Body fat levels below 4% are extremely rare and typically seen only in elite endurance athletes or individuals with medical conditions. Statistically, this is considered an outlier and may signal extreme leanness or undernourishment.',
  },
  medicalInterpretation: {
    Essential:
      'While this level of body fat supports essential life functions, staying at the low end may not be sustainable long-term for most people. It may still increase risk of hormonal imbalance or fatigue if not carefully managed.',
    Athletes:
      'This level of body fat generally supports optimal physical performance, metabolic health, and energy levels. It’s considered a healthy range for individuals engaged in regular physical training.',
    Fitness:
      'While still within a functional range, higher values in this category may begin to increase risk for metabolic concerns. Health outcomes will depend on factors like fat distribution, diet, and activity level.',
    Average:
      'At this level, risks for obesity-related conditions such as cardiovascular disease, insulin resistance, and joint strain are increased. Medical guidance may be appropriate to assess long-term risk.',
    Obese:
      'This level of body fat is associated with severe health risks including heart disease, type 2 diabetes, respiratory complications, and reduced life expectancy. Professional intervention is strongly advised.',
    Below:
      'Such low body fat may impair hormone production, immune function, and temperature regulation. It can lead to fatigue, infertility, and increased risk of organ damage. Medical evaluation is often recommended.',
  },
},
};
