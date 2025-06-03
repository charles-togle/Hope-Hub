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
