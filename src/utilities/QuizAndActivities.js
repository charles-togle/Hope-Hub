const ActivitiesData = [];

const QuizzesAndActivitiesData = [
  {
    type: 'Quiz',
    number: 1,
    title: 'Placeholder of the title',
    status: 'Done',
    details: {
      Score: '9/10',
      Ranking: '1',
      ['Date Taken']: 'April 14, 2025',
      ['Start-time']: '8:39PM',
      ['End-time']: '9:10PM',
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    type: 'Quiz',
    number: 2,
    title: 'Placeholder of the title',
    status: 'Pending',
    details: {},
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    type: 'Quiz',
    number: 3,
    title: 'Placeholder of the title',
    status: 'Locked',
    details: {},
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const QuizzesData = [
  {
    number: 1,
    questions: [
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Physical education plays a crucial role in the holistic development of students by promoting physical, mental, and social well-being. Which of the following best describes the primary objective of physical education in the academic setting, particularly in fostering lifelong fitness habits among students?',
        choices: [
          {
            text: 'To train students for competitive sports at a professional level regardless of interest or ability.',
            isCorrect: false,
          },
          {
            text: 'To provide students with a theoretical understanding of the history of global physical activities without requiring participation.',
            isCorrect: false,
          },
          {
            text: 'To enhance student performance in academic subjects through purely sedentary brain exercises integrated with sports trivia.',
            isCorrect: false,
          },
          {
            text: 'To equip students with knowledge, skills, and motivation to maintain a healthy lifestyle through regular physical activity across their lifespan.',
            isCorrect: true,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This component of physical fitness refers to the ability of a muscle or group of muscles to sustain repeated contractions against resistance for an extended period of time.',
        answer: 'Muscular endurance',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'In the context of physical fitness testing, which of the following statements best explains the significance of cardiorespiratory endurance in maintaining optimal health and performance?',
        choices: [
          {
            text: 'Cardiorespiratory endurance is solely related to an individual’s body weight and has little effect on overall health outcomes.',
            isCorrect: false,
          },
          {
            text: 'It measures how efficiently the heart and lungs supply oxygen during sustained physical activity, contributing significantly to stamina and disease prevention.',
            isCorrect: true,
          },
          {
            text: 'This fitness component is primarily concerned with improving muscle size and should only be developed through weight training.',
            isCorrect: false,
          },
          {
            text: 'It is irrelevant to physical education goals and is rarely assessed in school-based fitness programs.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This term describes the ability to move a joint or a group of joints through their complete range of motion without pain or restriction.',
        answer: 'Flexibility',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which of the following best illustrates the principle of specificity as it applies to physical training in a physical education setting, particularly when designing a workout program for a specific goal?',
        choices: [
          {
            text: 'Performing various physical activities randomly to ensure general fitness improvement without a specific focus.',
            isCorrect: false,
          },
          {
            text: 'Engaging in exercises that directly target the desired area of improvement, such as sprinting drills to increase running speed.',
            isCorrect: true,
          },
          {
            text: 'Using the same routine regardless of the individual’s sport or performance goals to maintain consistency.',
            isCorrect: false,
          },
          {
            text: 'Avoiding exercises that are difficult or uncomfortable, focusing only on preferred activities.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'In physical education, this principle refers to the gradual increase of stress placed upon the body during exercise training to stimulate adaptation and improvement.',
        answer: 'Progressive overload',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Warm-up routines are essential in any physical education class or training session. Which of the following best describes the purpose and benefit of performing a warm-up before engaging in more strenuous physical activity?',
        choices: [
          {
            text: 'To maximize muscular fatigue in preparation for rest and recovery.',
            isCorrect: false,
          },
          {
            text: 'To raise body temperature, increase blood flow to muscles, and reduce the risk of injury by preparing the body for physical exertion.',
            isCorrect: true,
          },
          {
            text: 'To replace the need for the actual workout by focusing on gentle stretching alone.',
            isCorrect: false,
          },
          {
            text: 'To serve as a time filler without any real physiological benefits before the actual activity begins.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Physical fitness has several components, each contributing to overall health and performance. Which of the following is *not* typically considered a component of health-related physical fitness?',
        choices: [
          {
            text: 'Body composition',
            isCorrect: false,
          },
          {
            text: 'Agility',
            isCorrect: true,
          },
          {
            text: 'Muscular strength',
            isCorrect: false,
          },
          {
            text: 'Flexibility',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This is the ability to exert force during an activity, commonly evaluated by exercises such as push-ups or weight lifting.',
        answer: 'Muscular strength',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Cool-down exercises are a vital part of a balanced workout. Which of the following best represents the reason for including a cool-down phase at the end of physical activity?',
        choices: [
          {
            text: 'To shock the muscles into recovery by stopping movement immediately after intense exertion.',
            isCorrect: false,
          },
          {
            text: 'To mentally transition from exercise to rest by incorporating static, non-physical reflection activities only.',
            isCorrect: false,
          },
          {
            text: 'To prevent muscle soreness, allow gradual heart rate recovery, and enhance flexibility through gentle movements and stretching.',
            isCorrect: true,
          },
          {
            text: 'To replace hydration and nutrition needs after intense physical activity through visualization techniques.',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    number: 2,
    questions: [
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which of the following components of physical fitness is primarily developed through aerobic exercises like jogging, swimming, or cycling?',
        choices: [
          {
            text: 'Muscular Strength',
            isCorrect: false,
          },
          {
            text: 'Flexibility',
            isCorrect: false,
          },
          {
            text: 'Cardiovascular Endurance',
            isCorrect: true,
          },
          {
            text: 'Body Composition',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This is the ability of a joint or series of joints to move through an unrestricted, pain-free range of motion.',
        answer: 'Flexibility',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'What term refers to the type of physical activity that increases heart rate and breathing for a sustained period?',
        choices: [
          {
            text: 'Anaerobic Exercise',
            isCorrect: false,
          },
          {
            text: 'Cardiovascular Exercise',
            isCorrect: true,
          },
          {
            text: 'Isometric Exercise',
            isCorrect: false,
          },
          {
            text: 'Plyometrics',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'It is the ability of muscles to exert force against resistance in a single effort.',
        answer: 'Muscular Strength',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which principle in physical training involves gradually increasing the amount of exercise to improve fitness?',
        choices: [
          {
            text: 'Reversibility',
            isCorrect: false,
          },
          {
            text: 'Overload',
            isCorrect: true,
          },
          {
            text: 'Specificity',
            isCorrect: false,
          },
          {
            text: 'Adaptation',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question: 'Which of the following best describes body composition?',
        choices: [
          {
            text: 'The body’s ability to move quickly',
            isCorrect: false,
          },
          {
            text: 'The percentage of fat, bone, water, and muscle in the body',
            isCorrect: true,
          },
          {
            text: 'The amount of energy used while resting',
            isCorrect: false,
          },
          {
            text: 'The strength of the heart muscles',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This training method involves short bursts of intense activity followed by brief periods of rest or lower-intensity exercise.',
        answer: 'Interval Training',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which component of fitness is most closely associated with balance and coordination?',
        choices: [
          {
            text: 'Muscular Endurance',
            isCorrect: false,
          },
          {
            text: 'Agility',
            isCorrect: true,
          },
          {
            text: 'Power',
            isCorrect: false,
          },
          {
            text: 'Reaction Time',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This term refers to the ability to perform a movement in the shortest time possible.',
        answer: 'Speed',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question: 'What does the “F” in the FITT principle stand for?',
        choices: [
          {
            text: 'Flexibility',
            isCorrect: false,
          },
          {
            text: 'Frequency',
            isCorrect: true,
          },
          {
            text: 'Fatigue',
            isCorrect: false,
          },
          {
            text: 'Function',
            isCorrect: false,
          },
        ],
      },
    ],
  },
  {
    number: 3,
    questions: [
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which of the following best defines anaerobic exercise and its primary benefit in physical training?',
        choices: [
          {
            text: 'Exercise performed with oxygen that improves endurance and cardiovascular health.',
            isCorrect: false,
          },
          {
            text: 'Short bursts of high-intensity activity without oxygen that increase muscle strength and power.',
            isCorrect: true,
          },
          {
            text: 'Gentle stretching exercises aimed at improving flexibility over time.',
            isCorrect: false,
          },
          {
            text: 'Low-impact activities focused on balance and coordination.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'Name the type of exercise that involves continuous rhythmic physical motion such as running, cycling, or swimming.',
        answer: 'Aerobic exercise',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'What does BMI stand for, and why is it used in physical education?',
        choices: [
          {
            text: 'Body Mass Index; to assess body fat based on height and weight.',
            isCorrect: true,
          },
          {
            text: 'Basic Muscle Information; to measure muscle size and strength.',
            isCorrect: false,
          },
          {
            text: 'Balanced Movement Indicator; to evaluate coordination and balance.',
            isCorrect: false,
          },
          {
            text: 'Body Motion Intensity; to track activity level during exercise.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'This term refers to the ability to quickly change the position of the body with speed and accuracy.',
        answer: 'Agility',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which nutrient is most important for muscle repair and growth after exercise?',
        choices: [
          {
            text: 'Carbohydrates',
            isCorrect: false,
          },
          {
            text: 'Fats',
            isCorrect: false,
          },
          {
            text: 'Proteins',
            isCorrect: true,
          },
          {
            text: 'Vitamins',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'What is the name of the training method involving alternating periods of high-intensity exercise with low-intensity recovery?',
        answer: 'Interval training',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which of the following best describes the FITT principle used in exercise programming?',
        choices: [
          {
            text: 'Frequency, Intensity, Time, and Type of exercise to design a training program.',
            isCorrect: true,
          },
          {
            text: 'Fitness, Integration, Technique, and Training for competitive athletes only.',
            isCorrect: false,
          },
          {
            text: 'Flexibility, Injury prevention, Timing, and Tactics for team sports.',
            isCorrect: false,
          },
          {
            text: 'Force, Impact, Torque, and Tension for weightlifting routines.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'What is the term for the maximum amount of force a muscle can produce in a single effort?',
        answer: 'Muscular strength',
      },
      {
        type: 'multiple-choice',
        duration: '5',
        question:
          'Which component of health-related fitness is primarily improved through exercises like yoga and Pilates?',
        choices: [
          {
            text: 'Cardiorespiratory endurance',
            isCorrect: false,
          },
          {
            text: 'Muscular endurance',
            isCorrect: false,
          },
          {
            text: 'Flexibility',
            isCorrect: true,
          },
          {
            text: 'Body composition',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '5',
        question:
          'What term describes the body’s ability to maintain balance and control during movement or while stationary?',
        answer: 'Balance',
      },
    ],
  },
];

const QuizzesTestData = [
  {
    number: 1,
    questions: [
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio. Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          {
            text: 'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio. Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
            isCorrect: true,
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
            isCorrect: false,
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
            isCorrect: false,
          },
          {
            text: 'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
    ],
  },
  {
    number: 2,
    questions: [
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
    ],
  },
  {
    number: 3,
    questions: [
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        type: 'multiple-choice',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        choices: [
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: true },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
          { text: 'Lorem ipsum dolor sit amet consectetur', isCorrect: false },
        ],
      },
      {
        type: 'identification',
        duration: '10',
        question:
          'Lorem ipsum dolor sit amet consectetur. Curabitur at tempus ultrices metus metus lectus nunc dictum tincidunt. Quam vestibulum id viverra vitae odio.',
        answer: 'Lorem ipsum dolor sit amet consectetur',
      },
    ],
  },
];

export { QuizzesAndActivitiesData, QuizzesData, ActivitiesData };
