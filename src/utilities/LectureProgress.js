import { Lessons } from './Lessons';

export const LectureProgress = () => {
  let lectureProgress = [];

  Lessons.forEach((item) => {
    lectureProgress.push({
      title: item.title,
      key: item.key,
      timeRemaining: 600,
      videoTime: 0,
      status: item.status,
    });
  });

  return lectureProgress;
};
