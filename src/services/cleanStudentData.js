const sampleData = [
  {
    email: 'charles3939togle@gmail.com',
    full_name: 'TestPerson1',
    lecture_progress: [
      [
        { key: 1, title: 'Personal Safety Protocol', status: 'Incomplete' },
        { key: 2, title: 'Physiological Indicators', status: 'Incomplete' },
        { key: 3, title: 'The FITT Principle', status: 'Incomplete' },
      ],
    ],
  },
  {
    email: 'ctogle.a12345617@umak.edu.ph',
    full_name: 'TestPerson2',
    lecture_progress: [
      [
        { key: 1, title: 'Personal Safety Protocol', status: 'Incomplete' },
        { key: 2, title: 'Physiological Indicators', status: 'Incomplete' },
        { key: 3, title: 'The FITT Principle', status: 'Done' },
      ],
    ],
  },
];

export const cleanStudentData = studentData => {
  const cleanedData = [];

  studentData.forEach(data => {
    const clean = {
      email: data.email,
      studentName: data.full_name,
      Lesson1: '',
      Lesson2: '',
      Lesson3: '',
    };
    const { lecture_progress } = data;
    lecture_progress[0].forEach(lecture => {
      clean[`Lesson${lecture.key}`] = lecture.status;
    });

    cleanedData.push(clean);
  });

  return cleanedData.sort((a, b) => a.studentName.localeCompare(b.studentName));
};
