//get from calculator.net

export const CalculatorData = {
  BMI: {
    description:
      'The Body Mass Index (BMI) Calculator estimates whether your weight is appropriate for your height. It uses a simple formula — weight divided by height squared — to classify your body size into categories like underweight, normal, overweight, or obese. BMI is commonly used in public health and clinical settings as a general indicator of potential weight-related health risks. A BMI within the “normal” range is associated with a lower likelihood of chronic conditions such as heart disease, diabetes, and high blood pressure. Higher or lower values may suggest the need for lifestyle changes or further medical evaluation. Although BMI is not a direct measure of body fat or overall health, it is a useful screening tool that can help guide awareness and decisions about physical well-being.',
    instructions: [
      'Choose your gender (male or female).',
      'Input your age in years.',
      'Enter your height in your prefered unit (Ft, Cm, M). You can select units by selecting the drop-down icon.',
      'Enter your weight in your prefered unit (kg, lbs).',
      'Click calculate.',
      'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
    ],
    statisticalInterpretation: {
      underweight:
        'Individuals in this BMI category make up a small percentage of the adult population. Statistically, underweight status is associated with a higher incidence of frailty, menstrual irregularities, and nutritional deficiencies, particularly in settings of limited food access or chronic illness. Long-term underweight status is also linked with increased risk of all-cause mortality compared to normal-weight peers.',
      normal:
        'This BMI range is the most common among healthy adults globally and is statistically associated with the lowest rates of chronic diseases and premature death. People in this category typically experience fewer complications related to metabolic, cardiovascular, or orthopedic health, though other lifestyle factors play a significant role.',
      overweight:
        'A substantial portion of adults fall into this BMI range. Epidemiological data show that individuals classified as overweight are more likely to develop conditions such as elevated blood pressure, insulin resistance, and lipid abnormalities — especially when combined with a sedentary lifestyle.',
      obese:
        'Obesity is increasingly prevalent worldwide and is strongly correlated with heightened risk of chronic diseases, including heart disease, type 2 diabetes, stroke, and certain cancers. Statistically, individuals in this range have higher healthcare utilization and reduced life expectancy compared to those in lower BMI categories.',
    },

    medicalInterpretation: {
      underweight:
        'Clinically, being underweight may indicate insufficient body fat and muscle mass, which can impair immune function, reduce bone density, and disrupt hormone balance. This condition may be due to malnutrition, eating disorders, hyperthyroidism, or chronic illness. Medical evaluation is often warranted.',
      normal:
        'From a medical perspective, a BMI in the normal range is considered healthy and typically reflects balanced energy intake and expenditure. It is associated with a lower risk of metabolic and cardiovascular conditions. However, it does not guarantee the absence of health risks, as overall well-being depends on diet, physical activity, stress, and other lifestyle habits.',
      overweight:
        'Excess body weight in this range can begin to affect metabolic function, increasing the risk of insulin resistance, joint problems, and fatty liver disease. While not as immediately concerning as obesity, overweight status may still require intervention, particularly if other health risk factors are present.',
      obese:
        'Medically, obesity is classified as a chronic condition characterized by excessive body fat accumulation that negatively impacts health. It contributes to systemic inflammation, hormonal imbalance, and higher risk for diseases like type 2 diabetes, heart disease, and certain cancers. Weight management through lifestyle changes or medical treatment is strongly recommended.',
    },

  },
  //medical and statistical interpretation is from https://chatgpt.com/share/683d8381-6e78-800c-a55d-8ea030a1d742
  BMR: {
    description:
      'The Basal Metabolic Rate (BMR) Calculator estimates the number of calories your body needs to maintain basic functions while at rest — such as breathing, circulating blood, and regulating temperature. This is the minimum energy your body requires to stay alive and functioning, even if you were completely inactive all day. BMR is the foundation for calculating total daily calorie needs. When combined with your activity level, it helps determine how many calories you need to maintain, lose, or gain weight. Factors like age, sex, weight, and height all influence your BMR, since they affect your body’s energy use. This tool is especially useful for planning nutrition and fitness goals, as it gives you a baseline for understanding how your body burns energy throughout the day.',
    instructions: [
      'Choose your gender (male or female).',
      'Input your age in years.',
      'Enter your height in your prefered unit (Ft, Cm, M). You can select units by selecting the drop-down icon.',
      'Enter your weight in your prefered unit (kg, lbs).',
      "Pick your desired formula (default: Mifflin St Jeor's formula)",
      'Pick your activity level (default: Moderate: exercise 4-5 times/week)',
      'Click calculate.',
      'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
    ],
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
  statisticalInterpretation: 'Ideal Body Weight (IBW) represents an estimated weight range that has been statistically associated with lower rates of chronic disease and improved long-term survival in population-level studies. It reflects average body weights observed in healthy individuals of the same height and sex. Unlike BMI or body fat percentage, IBW does not use risk-based categories (such as underweight or obese), because it is a reference value — not a measurement of current health status. Its primary purpose is to serve as a comparative baseline, not a diagnostic threshold.',
  medicalInterpretation: 'Medically, Ideal Body Weight is used as a reference point for assessing nutritional status, calculating medication dosages, and estimating caloric needs, particularly in hospitalized or underweight patients. Being significantly below IBW may suggest undernutrition, muscle wasting, or systemic illness, and may increase the risk of weakened immunity, fatigue, or poor wound healing. Weights significantly above IBW may reflect increased fat mass and elevate the risk of metabolic conditions such as type 2 diabetes, cardiovascular disease, and joint strain. However, since IBW does not consider body composition (like muscle mass or fat distribution), it should be interpreted in context with other health indicators.',
  },
  WaterIntake: {
    description: 'The Daily Water Intake Calculator estimates how much water you should drink each day based on your weight and activity level. These two inputs are among the most important for determining hydration needs. By entering this information, you’ll receive a personalized water intake recommendation designed to support everyday health and well-being. This calculator uses a widely accepted method: estimating baseline fluid needs at approximately 33 milliliters per kilogram of body weight, then adjusting based on your level of physical activity. The more you exercise or sweat, the more water your body requires to maintain optimal balance. Using this tool can help you become more aware of how your daily habits influence hydration. It promotes better energy levels, physical performance, and general health by encouraging consistent fluid intake tailored to your body. While the recommendation is not a strict rule, it can be a helpful starting point for building better hydration habits.',
    instructions: [
      'Enter your weight in your prefered unit (kg, lbs). You can select units by selecting the drop-down icon.',
      'Choose the option that best describes your typical weekly physical activity. (default: Sedentary (Little to No Exercise))',
      'Click calculate.',
      'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
    ],
    statisticalInterpretation: {
      below:
        'Your estimated water intake is below the average range typically observed in healthy adults with similar weight and activity levels. Statistically, low fluid intake is associated with more frequent occurrences of fatigue, headaches, and reduced cognitive performance. In population studies, chronic underhydration correlates with greater risks of urinary tract infections and kidney stone formation.',
      within:
        'Your water intake falls within a statistically typical range for healthy hydration across a broad sample of the population. Individuals in this range are less likely to experience symptoms of dehydration and more likely to maintain physical and mental performance throughout the day.',
      above:
        'Your reported or estimated water intake exceeds what is typical for people of your weight and activity level. While this may be appropriate in cases of high heat, physical exertion, or specific health needs, most people do not require this volume daily. Population data suggests higher-than-average intake is safe for healthy individuals, but sustained overhydration without medical need is uncommon.'
    },
    medicalInterpretation: {
      below:
        'Inadequate hydration can compromise vital functions including thermoregulation, waste elimination, joint lubrication, and nutrient absorption. Chronically low water intake increases the risk of constipation, kidney stones, and reduced blood pressure regulation. It may also contribute to fatigue and decreased alertness. Medical attention may be warranted if low intake persists or is due to limited access or illness.',
      within:
        'Maintaining daily hydration within this range supports all major bodily systems, including cardiovascular, renal, digestive, and neurological health. It helps regulate temperature, sustain energy levels, and promote toxin clearance. This intake range is considered optimal for most healthy adults under standard environmental and activity conditions.',
      above:
        'Excessive fluid intake can occasionally lead to a dilution of blood sodium levels, a condition known as hyponatremia, particularly in endurance athletes or individuals with specific health conditions. However, the kidneys of healthy individuals typically manage excess fluid effectively. High intake may be appropriate in hot climates or during vigorous exercise, but caution is advised for individuals on fluid restrictions or with kidney-related conditions.'
    }
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
    'Click calculate.',
    'Read results below. Medical and statistical interpretations are also viewable. All outputs are for informational use only and not a substitute for professional medical advice.',
  ],
  statisticalInterpretation: {
    Below:
      'Body fat levels below 4% are extremely rare and typically observed only in elite endurance athletes or individuals with severe metabolic or eating disorders. Statistically, this level is considered an outlier and is not commonly maintained long-term in any general population.',
    Essential:
      'This range represents the minimum level of fat required for survival and basic physiological function. It is rare outside of competitive sports or genetic exceptions and is not statistically representative of the general population.',
    Athletes:
      'This body fat range is most commonly seen among individuals who engage in high levels of physical training. It is statistically less common in the general population but typical in athletic or fitness-focused subgroups.',
    Fitness:
      'This category represents a moderate level of body fat that is statistically common among adults who engage in occasional to regular physical activity. It aligns with average to slightly above-average norms in many health-focused populations.',
    Average:
      'This body fat range exceeds levels generally considered optimal for health and is statistically prevalent in less active or aging populations. It indicates a shift toward higher fat accumulation and potential health risk.',
    Obese:
      'Body fat over 70% is exceptionally rare and substantially higher than population norms. This range reflects extreme levels of adiposity and is associated with statistically significant increases in all-cause morbidity and mortality.'
  },

  medicalInterpretation: {
    Below:
      'Extremely low body fat levels can impair hormone regulation, immune response, and temperature control. Prolonged maintenance of this range may increase the risk of fatigue, infertility, and cardiac or organ dysfunction. Medical supervision is advised if this occurs unintentionally.',
    Essential:
      'This level of body fat is necessary to maintain vital bodily processes such as cushioning of organs, hormone production, and nutrient storage. While medically functional, sustaining this range long-term — especially without athletic supervision — may strain endocrine and metabolic systems.',
    Athletes:
      'This level supports physical performance, strength, and endurance and is considered medically healthy when supported by a balanced diet and regular exercise. It generally indicates strong metabolic and cardiovascular fitness.',
    Fitness:
      'While medically acceptable, individuals in this range may begin to see early signs of fat-related metabolic strain, particularly if visceral fat is elevated. Overall health impact depends on lifestyle, fat distribution, and muscle mass.',
    Average:
      'Higher body fat levels in this range can increase the risk of insulin resistance, elevated cholesterol, joint stress, and other weight-related conditions. Regular physical activity and nutritional counseling may help mitigate these risks.',
    Obese:
      'Excessive body fat in this range significantly raises the likelihood of chronic diseases such as type 2 diabetes, cardiovascular disease, and certain cancers. It may also impair mobility, lung capacity, and mental health. Medical intervention is often recommended to reduce health complications.'
  }

  },
};
