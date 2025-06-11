const convertLbsToKg = number => number * 0.4536;
const convertKgToLbs = number => number / 0.4536;
const convertFtToM = number => number * 0.3048;
const convertMToFt = number => number / 0.3048;
const convertCmToM = number => number / 100;

export const getBMI = (height, weight, heightUnit, weightUnit) => {
  // Convert height to meters
  let heightInMeters;
  if (heightUnit === 'ft') {
    heightInMeters = convertFtToM(height);
  } else if (heightUnit === 'cm') {
    heightInMeters = convertCmToM(height);
  } else {
    heightInMeters = height;
  }
  const weightInKg = weightUnit === 'lbs' ? convertLbsToKg(weight) : weight;

  console.log('Height in meters:', heightInMeters);
  console.log('Weight in kg:', weightInKg);

  return weightInKg / (heightInMeters * heightInMeters);
};

export const getBMR = (
  gender,
  age,
  height,
  weight,
  formulaVariant,
  bodyFat,
  heightUnit = 'cm', // default to cm
  weightUnit = 'kg', // default to kg
) => {
  if (!gender) {
    throw new Error('Gender is unknown');
  }
  gender = gender.toLowerCase();

  // Convert height to cm if needed
  let heightInCm;
  if (heightUnit === 'ft') {
    heightInCm = convertFtToM(height) * 100; // ft -> m -> cm
  } else if (heightUnit === 'm') {
    heightInCm = height * 100; // m -> cm
  } else {
    heightInCm = height; // assume cm
  }

  // Convert weight to kg if needed
  const weightInKg = weightUnit === 'lbs' ? convertLbsToKg(weight) : weight;

  const activityMultipliers = {
    sedentary: 1.2,
    'lightly active': 1.375,
    'moderately active': 1.465,
    'very active': 1.55,
    'extra active': 1.725,
    'super active': 1.9,
  };

  let bmr;
  switch (formulaVariant) {
    case 'Mifflin St Jeor':
      bmr =
        gender === 'male'
          ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
          : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      break;

    case 'Revised Harris-Benedict':
      bmr =
        gender === 'male'
          ? 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age + 88.362
          : 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * age + 447.593;
      break;

    case 'Katch-Mcardle':
      if (bodyFat == null) {
        throw new Error(
          'Body fat percentage is required for Katch-McArdle formula',
        );
      }
      bmr = 370 + 21.6 * (1 - bodyFat) * weightInKg;
      break;

    default:
      throw new Error(`Unknown formula variant: ${formulaVariant}`);
  }

  const caloriesByActivity = {};
  for (const [level, multiplier] of Object.entries(activityMultipliers)) {
    caloriesByActivity[level] = Math.round(parseFloat(bmr * multiplier));
  }

  return {
    BMR: parseFloat(bmr.toFixed(2)),
    DailyCalories: caloriesByActivity,
  };
};
