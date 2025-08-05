import { PhysicalFitnessTestList } from './PhysicalFitnessTestList';

export const numberOfTests = PhysicalFitnessTestList.length;
export const PhysicalFitnessData = {
  name: '',
  gender: '',
  email: '',
  category: '',
  isPARQFinished: false,
  finishedTestIndex: Array.from({ length: numberOfTests.length }, () => -1),
};
