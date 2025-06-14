import supabase from '@/client/supabase';

const Quizzes = [
  {
    number: 1,
    title: 'Personal Safety Protocols',
    status: 'Pending',
    details: {},
    content:
      'Read each question carefully. Choose the best answer from the options provided. Each item is worth 1 point.',
  },
  {
    number: 2,
    title: 'PhysioCal Challenge',
    status: 'Locked',
    details: {},
    content:
      'Each question presents a short profile with: Age, Resting Heart Rate (RHr), Required intensity range (e.g., 60–80%)',
  },
];

const QuizzesData = [
  {
    number: 1,
    questions: [
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          "Why is it important to reduce exercise intensity and take breaks during hot weather, even if you don't feel thirsty?",
        choices: [
          {
            text: 'Your muscles burn out faster in heat',
            isCorrect: false,
          },
          {
            text: 'The body can overheat before signs appear',
            isCorrect: true,
          },
          {
            text: 'You lose energy quicker through sweat',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'Which combination of symptoms most clearly indicates a person is suffering from heat exhaustion?',
        choices: [
          {
            text: 'Cramps, intense thirst, and nausea',
            isCorrect: true,
          },
          {
            text: 'Shivering, loss of coordination, and fatigue',
            isCorrect: false,
          },
          {
            text: 'Slurred speech, headache, and confusion',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'A person exercises midday wearing a hoodie and sweats. After 30 minutes, they feel dizzy and nauseous. What is the best immediate action?',
        choices: [
          {
            text: 'Sit down and wait to cool off',
            isCorrect: false,
          },
          {
            text: 'Hydrate and remove excess clothing',
            isCorrect: true,
          },
          {
            text: 'Push through to complete the workout',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'Why is exercising at high altitudes in cold weather risky without sun protection?',
        choices: [
          {
            text: "There's less oxygen",
            isCorrect: false,
          },
          {
            text: 'UV rays can cause sunburn',
            isCorrect: true,
          },
          {
            text: 'Cold prevents sweating',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          "What's the most effective way to avoid injury when beginning a new high-intensity workout plan?",
        choices: [
          {
            text: 'Warm up, start slow, and gradually increase intensity',
            isCorrect: true,
          },
          {
            text: 'Use a fitness tracker to monitor calories burned',
            isCorrect: false,
          },
          {
            text: 'Only exercise on weekends to allow recovery',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'In cold conditions, what strategy helps both injury prevention and body temperature regulation?',
        choices: [
          {
            text: 'Drinking coffee before exercising',
            isCorrect: false,
          },
          {
            text: 'Wearing a single heavy layer',
            isCorrect: false,
          },
          {
            text: 'Longer warm-ups and multiple clothing layers',
            isCorrect: true,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'Which of the following could most likely lead to hypothermia during physical activity?',
        choices: [
          {
            text: 'Wearing layers and staying hydrated',
            isCorrect: false,
          },
          {
            text: 'Exercising in short bursts with frequent breaks',
            isCorrect: false,
          },
          {
            text: 'Staying out too long in cold without proper clothing',
            isCorrect: true,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'If someone complains of muscle cramps and stops sweating during a hot-weather workout, what should be suspected?',
        choices: [
          {
            text: 'Recovery from a past illness',
            isCorrect: false,
          },
          {
            text: 'Dehydration or heat stroke',
            isCorrect: true,
          },
          {
            text: 'Cold-induced fatigue',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question: 'What is a key principle of the RICE method for injury care?',
        choices: [
          {
            text: 'Rotate injured areas',
            isCorrect: false,
          },
          {
            text: 'Immediate motion to reduce stiffness',
            isCorrect: false,
          },
          {
            text: 'Rest and apply compression',
            isCorrect: true,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'Why should you maintain hydration even in cold weather workouts?',
        choices: [
          {
            text: 'Cold air causes dry skin',
            isCorrect: false,
          },
          {
            text: 'You still lose fluids through breath and sweat',
            isCorrect: true,
          },
          {
            text: 'Drinking water keeps you warmer',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'Which symptom is more specific to cold-related illnesses than heat-related ones?',
        choices: [
          {
            text: 'Fatigue',
            isCorrect: false,
          },
          {
            text: 'Loss of coordination',
            isCorrect: true,
          },
          {
            text: 'Headache',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'What is the purpose of the PAR-Q before starting a workout plan?',
        choices: [
          {
            text: 'Measure heart rate accuracy',
            isCorrect: false,
          },
          {
            text: 'Identify potential health risks',
            isCorrect: true,
          },
          {
            text: 'Calculate body mass index',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          "When preparing for exercise in unpredictable weather, what's the safest approach?",
        choices: [
          {
            text: 'Plan indoor alternatives and monitor weather conditions',
            isCorrect: true,
          },
          {
            text: 'Always wear heavy clothing',
            isCorrect: false,
          },
          {
            text: 'Skip warm-up to conserve energy',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question:
          'If a person shows signs of frostbite during a hike, what should NOT be done?',
        choices: [
          {
            text: 'Rub the affected area to warm it',
            isCorrect: true,
          },
          {
            text: 'Seek shelter and slowly warm the area',
            isCorrect: false,
          },
          {
            text: 'Avoid walking on frostbitten feet',
            isCorrect: false,
          },
        ],
      },
      {
        type: 'multiple-choice',
        duration: '60',
        question: "What's the risk of ignoring small pains during exercise?",
        choices: [
          {
            text: 'Delayed muscle growth',
            isCorrect: false,
          },
          {
            text: 'Faster fatigue',
            isCorrect: false,
          },
          {
            text: 'Worsening of minor injuries into major ones',
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    number: 2,
    questions: [
      {
        type: 'identification',
        duration: '180',
        question:
          "Calculate Charles' Target Heart Rate range using:\nAge: 25\nResting Heart Rate: 65 bpm\nIntensity: 60-80%\n\nThe student must:\n1. Calculate HRmax using 220 - Age\n2. Find HRr: HRmax - RHr\n3. Calculate THR range:\n   - Lower THR = HRr × 0.60 + RHr\n   - Upper THR = HRr × 0.80 + RHr\n\nThe answer must be in the format: Lower THR-Upper THR bpm",
        answer: '143-169 bpm',
      },
    ],
  },
];

const QuizzesDataOld = [
  {
    number: 1,
    questions: [
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'This component of physical fitness refers to the ability of a muscle or group of muscles to sustain repeated contractions against resistance for an extended period of time.',
        answer: 'Muscular endurance',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'This term describes the ability to move a joint or a group of joints through their complete range of motion without pain or restriction.',
        answer: 'Flexibility',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'In physical education, this principle refers to the gradual increase of stress placed upon the body during exercise training to stimulate adaptation and improvement.',
        answer: 'Progressive overload',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
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
        duration: '60',
        question:
          'This is the ability to exert force during an activity, commonly evaluated by exercises such as push-ups or weight lifting.',
        answer: 'Muscular strength',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
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
        duration: '60',
        question:
          'This is the ability of a joint or series of joints to move through an unrestricted, pain-free range of motion.',
        answer: 'Flexibility',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'It is the ability of muscles to exert force against resistance in a single effort.',
        answer: 'Muscular Strength',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
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
        duration: '60',
        question:
          'This training method involves short bursts of intense activity followed by brief periods of rest or lower-intensity exercise.',
        answer: 'Interval Training',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'This term refers to the ability to perform a movement in the shortest time possible.',
        answer: 'Speed',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
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
        duration: '60',
        question:
          'Name the type of exercise that involves continuous rhythmic physical motion such as running, cycling, or swimming.',
        answer: 'Aerobic exercise',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'This term refers to the ability to quickly change the position of the body with speed and accuracy.',
        answer: 'Agility',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'What is the name of the training method involving alternating periods of high-intensity exercise with low-intensity recovery?',
        answer: 'Interval training',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'What is the term for the maximum amount of force a muscle can produce in a single effort?',
        answer: 'Muscular strength',
      },
      {
        type: 'multiple-choice',
        duration: '60',
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
        duration: '60',
        question:
          'What term describes the body’s ability to maintain balance and control during movement or while stationary?',
        answer: 'Balance',
      },
    ],
  },
];

async function fetchQuizzes() {
  const { data, error } = await supabase
    .from('quiz')
    .select(
      `
    id,
    title,
    description,
    questions,
    quiz_progress!left (
      id,
      status,
      score,
      total_items,
      date_taken,
      start_time,
      end_time
    )
  `,
    )
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching quizzes:', error);
    return;
  }

  console.log('Quizzes:', data);
  return data;
}

function extractQuizDetails(quizData) {
  if (!Array.isArray(quizData) || quizData.length === 0) return;
  quizData.map((quiz, index) => {
    let progress = quiz.quiz_progress[0] || [];
    console.log('quiz', progress);
    quiz.number = quiz.id;
    quiz.status = (progress && progress.status) || 'Locked';
    quiz.details = !progress.date_taken
      ? {}
      : {
          Score: `${progress.score}/${progress.total_items}`,
          // Ranking: progress.ranking || 'N/A', set this later using a separate function
          ['Date Taken']: new Date(progress.date_taken).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          ),
          ['Start-time']: new Date(progress.start_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),

          ['End-time']: new Date(progress.end_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
    quiz.content = quiz.description;
    return quiz;
  });
  return quizData;
}

async function fetchQuizQuestions(quizId) {
  const { data, error } = await supabase
    .from('quiz')
    .select(`questions`)
    .eq('id', quizId)
    .single();

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  console.log('Questions:', data.questions);
  return data.questions.questions;
}

async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Auth error:', error.message);
  }
  return user;
}

async function startQuiz(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .update({
      start_time: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('quiz_id', quizId);

  if (error) {
    console.error('Error starting quiz:', error.message);
    return error;
  } else {
    console.log('Quiz started');
  }
}

async function fetchQuizStateIfExists(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select(
      'user_id, quiz_id, question_index, score, points, status, questions_answered, start_time, total_items',
    )
    .eq('quiz_id', quizId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching quiz state:', error.message);
  }

  console.log('Quiz state:', data);

  if (data.status !== 'Done' && !data.start_time) await startQuiz(quizId); // Ensure quiz is started if it exists

  return data;
}

function extractQuizState(quizState) {
  if (!quizState) return null;

  return {
    quizId: quizState.quiz_id,
    questionIndex: quizState.question_index || 0,
    score: quizState.score || 0,
    points: quizState.points || 0,
    currentQuestionPoints: 0,
    status: quizState.status,
    questionsAnswered: quizState.questions_answered || [],
  };
}

function updateQuestionsRemaining(quizState, questions) {
  if (!quizState || !questions) return questions;
  if (
    quizState.questionIndex === 0 ||
    !quizState.questionsAnswered ||
    quizState.status === 'Done'
  )
    return questions;

  const answeredSet = new Set(
    quizState.questionsAnswered.map((q) => q.question),
  );

  const answeredQuestions = questions.filter((q) =>
    answeredSet.has(q.question),
  );
  console.log('Answered Questions:', answeredQuestions);

  const unansweredQuestions = questions.filter(
    (q) => !answeredSet.has(q.question),
  );
  console.log('Unanswered Questions:', unansweredQuestions);

  const allQuestions = [...answeredQuestions, ...unansweredQuestions];

  console.log('Merged Questions:', allQuestions);

  return allQuestions;

  // questionsAnswered: [
  //   ...prevQuizState.questionsAnswered,
  //   {
  //     question: questions[prevQuizState.questionIndex].question,
  //     correctAnswer: correctAnswer,
  //     answer: answer,
  //     isCorrect: isCorrect,
  //   },
  // ],
  //  "questions": [
  //     {
  //       "type": "multiple-choice",
  //       "duration": "60",
  //       "question": "Why is it important to reduce exercise intensity and take breaks during hot weather, even if you don't feel thirsty?",
  //       "choices": [
  //         {
  //           "text": "Your muscles burn out faster in heat",
  //           "isCorrect": false
  //         },
  //         {
  //           "text": "The body can overheat before signs appear",
  //           "isCorrect": true
  //         },
  //         {
  //           "text": "You lose energy quicker through sweat",
  //           "isCorrect": false
  //         }
  //       ]
  //     },
}

async function submitAnswer(quizState) {
  const { quizId, questionIndex, score, points, questionsAnswered } = quizState;
  const user = await getCurrentUser();

  // return {
  //   quizId: quizState.quiz_id,
  //   questionIndex: quizState.question_index || 0,
  //   score: quizState.score || 0,
  //   points: quizState.points || 0,
  //   currentQuestionPoints: 0,
  //   status: quizState.status,
  //   questionsAnswered: quizState.questions_answered,
  // };
  const { data, error } = await supabase
    .from('quiz_progress')
    .update({
      question_index: questionIndex,
      score: score,
      points: points,
      questions_answered: questionsAnswered,
    })
    .eq('user_id', user.id)
    .eq('quiz_id', quizId);

  if (error) {
    console.error('Error submitting answer:', error.message);
    return error;
  } else {
    console.log('Quiz progress updated');
  }
}

async function markQuizAsDone(quizState) {
  const { quizId, questionIndex, status } = quizState;
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .update({
      question_index: questionIndex + 1,
      status: status,
      total_items: questionIndex + 2,
      date_taken: new Date().toLocaleDateString('en-CA'),
      end_time: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .eq('quiz_id', quizId);

  if (error) {
    console.error('Error marking quiz as done:', error.message);
    return error;
  } else {
    console.log('Quiz marked as done');
  }
}

async function getUserRanking(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('user_id, score')
    .eq('quiz_id', quizId)
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching ranking:', error);
    return;
  }

  console.log('Top scores:', data);

  // Get user ranking
  const userRanking = data
    .map((item, index) => ({
      user_id: item.user_id,
      score: item.score,
      rank: index + 1,
    }))
    .find((item) => item.user_id === user.id).rank;

  console.log('User ranking:', userRanking);
  return userRanking;
}

async function fetchLeaderboard(quizId) {
  const { data, error } = await supabase
    .from('quiz_progress')
    .select(
      `
      id,
      user_id,
      points,
      profile (
        full_name,
      )
    `,
    )
    .eq('quiz_id', quizId)
    .order('score', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return;
  }

  console.log('Leaderboard:', data);

  return data;
}

export {
  Quizzes,
  QuizzesData,
  fetchQuizzes,
  extractQuizDetails,
  fetchQuizQuestions,
  getCurrentUser,
  getUserRanking,
  fetchLeaderboard,
  fetchQuizStateIfExists,
  extractQuizState,
  updateQuestionsRemaining,
  submitAnswer,
  markQuizAsDone,
};
