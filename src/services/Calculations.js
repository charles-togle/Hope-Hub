import { ActivityIcon } from "lucide-react";

const convertLbsToKg = number => number * 0.4536;
const convertKgToLbs = number => number / 0.4536;
const convertFtToM = number => number * 0.3048;
const convertMToFt = number => number / 0.3048;
const convertCmToM = number => number / 100;
const convertCmToFt = number => number / 30.48;
const convertCmToInches = number => number / 2.54;
const convertMToInches = number => number * 39.3701;
const convertFtToInches = number => number * 12;
const convertInchesToM = number => number * 0.0254;

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

export const getCalorieGoals = (bmr, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,
    'lightly active': 1.375,
    'moderately active': 1.465,
    active: 1.55,
    'very active': 1.725,
    'extra active': 1.9,
  };

  let multiplier;
  switch (activityLevel) {
    case 'Sedentary: little or no exercise':
      multiplier = activityMultipliers.sedentary;
      break;
    case 'Light: exercise 1-3 times/week':
      multiplier = activityMultipliers['lightly active'];
      break;
    case 'Moderate: exercise 4-5 times/week':
      multiplier = activityMultipliers['moderately active'];
      break;
    case 'Active: daily exercise or intense exercise 3-4 times/week':
      multiplier = activityMultipliers['active'];
      break;
    case 'Very Active: intense exercise 6-7 times/week':
      multiplier = activityMultipliers['very active'];
      break;
    case 'Extra Active: very intense exercise daily, or physical job':
      multiplier = activityMultipliers['extra active'];
      break;
  }

  const tdee = bmr * multiplier;
  return {
    weightLoss: {
      'Mild Weight Loss': Math.round(tdee - 250),
      'Weight Loss': Math.round(tdee - 500),
      'Extreme Weight Loss': Math.round(tdee - 1000),
    },
    weightGain: {
      'Maintain Weight': Math.round(tdee),
      'Mild Weight Gain': Math.round(tdee + 250),
      'Weight Gain': Math.round(tdee + 500),
      'Extreme Weight Gain': Math.round(tdee + 1000),
    },
  };
};

export const getTDEE = (
  gender,
  age,
  height,
  weight,
  activityType,
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
    'Sedentary (Little to No Exercise)': 1.2,
    'Light Exercise (1-2 times/week)': 1.375,
    'Moderate Exercise (3-5 times/week)': 1.55,
    'Heavy Exercise (6-7 times/week)': 1.725,
    'Athlete (2x per day)': 2.0,
  };

  let tdee;
  switch (activityType) {
    case 'Sedentary (Little to No Exercise)':
      tdee =
        gender === 'male'
          ? (10 * weightInKg + 6.25 * heightInCm - 5 * age + 5) * activityMultipliers['Sedentary (Little to No Exercise)']
          : (10 * weightInKg + 6.25 * heightInCm - 5 * age - 161) * activityMultipliers['Sedentary (Little to No Exercise)'];
      break;

    case 'Light Exercise (1-2 times/week)':
      tdee =
        gender === 'male'
          ? (10 * weightInKg + 6.25 * heightInCm - 5 * age + 5) * activityMultipliers['Light Exercise (1-2 times/week)']
          : (10 * weightInKg + 6.25 * heightInCm - 5 * age + 161) * activityMultipliers['Light Exercise (1-2 times/week)'];
      break;

    case 'Moderate Exercise (3-5 times/week)':
      tdee =
        gender === 'male'
          ? (13.397 * weightInKg + 6.25 * heightInCm - 5 * age + 5) * activityMultipliers['Moderate Exercise (3-5 times/week)']
          : (9.247 * weightInKg + 6.25 * heightInCm - 5 * age - 161) * activityMultipliers['Moderate Exercise (3-5 times/week)'];
      break;

    case 'Heavy Exercise (6-7 times/week)':
      tdee =
        gender === 'male'
          ? (13.397 * weightInKg + 6.25 * heightInCm - 5 * age + 5) * activityMultipliers['Heavy Exercise (6-7 times/week)']
          : (9.247 * weightInKg + 6.25 * heightInCm - 5 * age - 161) * activityMultipliers['Heavy Exercise (6-7 times/week)'];
      break;

    case 'Athlete (2x per day)':
      tdee =
        (gender === 'male'
          ? 13.397 * weightInKg + 6.25 * heightInCm - 5 * age + 5
          : 9.247 * weightInKg + 6.25 * heightInCm - 5 * age + 5) * activityMultipliers['Athlete (2x per day)'];
      break;

    default:
      throw new Error(`Unknown formula variant: ${formulaVariant}`);
  }

  const caloriesByActivity = {};
  for (const [level, multiplier] of Object.entries(activityMultipliers)) {
    caloriesByActivity[level] = Math.round(parseFloat(tdee * multiplier));
  }

  return {
    TDEE: parseFloat(tdee.toFixed(2)),
    DailyCalories: caloriesByActivity,
  };
};

export const getIBW = (height, heightUnit, gender ) => {
  // convert height to inches/feet
  console.log(heightUnit)
  let heightInInches;
  if (heightUnit === 'm') {
    heightInInches = convertMToInches(height);
  } else if (heightUnit === 'cm') {
    heightInInches = convertCmToInches(height);
  } else {
    heightInInches = convertFtToInches(height);
  }

  const normalizedGender = gender.toLowerCase();

  let Robinson, Miller, Devine, Hamwi;
  // const HealthyBMIRange = (height) => {
  //   minWeight = 18.5 * height ** 2;
  //   maxWeight = 24.9 * height ** 2;
  //   String("Minimum: " + toString(minWeight))
  //   String("Maximum: " + toString(maxWeight))
  // };

  const overFiveFt = Math.max(heightInInches - 60, 0);
  const heightInMeters = convertInchesToM(heightInInches);

  const minWeight = 18.5 * heightInMeters ** 2;
  const maxWeight = 24.9 * heightInMeters ** 2;

  if (normalizedGender === 'female') {
    Robinson = 49 + 1.7 * overFiveFt;
    Miller = 53.1 + 1.36 * overFiveFt;
    Devine = 45.5 + 2.3 * overFiveFt;
    Hamwi = 45.5 + 2.2 * overFiveFt;
  } else {
    Robinson = 52 + 1.9 * overFiveFt;
    Miller = 56.2 + 1.41 * overFiveFt;
    Devine = 50 + 2.3 * overFiveFt;
    Hamwi = 48 + 2.7 * overFiveFt;
  }

 return {
    IBW: {
      Robinson: parseFloat(Robinson.toFixed(2)),
      Miller: parseFloat(Miller.toFixed(2)),
      Devine: parseFloat(Devine.toFixed(2)),
      Hamwi: parseFloat(Hamwi.toFixed(2)),
    },
    HealthyBMIRange: {
      min: parseFloat(minWeight.toFixed(2)),
      max: parseFloat(maxWeight.toFixed(2)),
    },
  };
};

export const getWaterIntake = (weight, activityLevel, weightUnit) => {
  const weightInKg = weightUnit === 'lbs' ? convertLbsToKg(weight) : weight;
  
  const activityMultipliers = {
    'Sedentary (Little to No Exercise)': 0,
    'Light Exercise (1-2 times/week)': 0.2,
    'Moderate Exercise (3-5 times/week)': 0.35,
    'High Exercise (6-7 times/week)': 0.5,
    'Extreme (2x per day)': 0.7,
  };

  let waterIntake = weightInKg * 0.033;
  console.log(waterIntake);

  switch(activityLevel) {
    case 'Sedentary (Little to No Exercise)': waterIntake += 0; break;
    case 'Light Exercise (1-2 times/week)': waterIntake += 0.2; break;
    case 'Moderate Exercise (3-5 times/week)': waterIntake += 0.35; break;
    case 'High Exercise (6-7 times/week)': waterIntake += 0.5; break;
    case 'Extreme (2x per day)': waterIntake += 0.7; break;
    default: throw new Error(`Unknown formula variant.`);
  }

  return parseFloat(waterIntake.toFixed(2));

}