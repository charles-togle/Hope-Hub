const convertLbsToKg = number => number * 0.4536;
const convertKgToLbs = number => number / 0.4536;
const convertFtToM = number => number * 0.3048;
const convertMToFt = number => number / 0.3048;

export const getBMI = (height, weight, heightUnit, weightUnit) => {
  const heightInMeters = heightUnit === 'ft' ? convertFtToM(height) : height; // if weight unit is lbs, convert, else retain
  const weightInKg = weightUnit === 'lbs' ? convertLbsToKg(weight) : weight;
  return weightInKg / (heightInMeters * heightInMeters);
};
