import { PhysicalFitnessTestList } from './PhysicalFitnessTestList';

const numberOfTests = PhysicalFitnessTestList.length;
export const PhysicalFitnessData = {
  name: '',
  gender: '',
  email: '',
  category: '',
  isPARQFinished: false,
  finishedTestIndex: Array.from({ length: numberOfTests }, () => -1),
};
