export const PhysicalFitnessTestList = [
  {
    title: 'Zipper Test',
    key: 'zipperTest',
    equipment: ['Tape measure or meter stick'],
    instructionsForTester: [
      'Stand erect.',
      'Raise your right arm, bend your elbow, and reach down across your back as far as possible, to test the right shoulder.',
      'Extend your left arm down and behind your back, bend your elbow up across your back, and try to reach/cross your fingers over those of your right hand as if to pull a zipper or scratch between the shoulder blades.',
      'To test the left shoulder, repeat the previous steps with the left hand over the left shoulder.',
    ],
    instructionsForPartner: [
      'Observe whether the fingers touched or overlapped each other.',
      'If not, measure the gap between the middle fingers of both hands.',
      'Record the distance in centimeters.',
    ],
    instructionsScoring: ['Record zipper test to the nearest 0.1 centimeter'],
    classification: [
      { min: 6, interpretation: 'Excellent' },
      { min: 4, max: 5.9, interpretation: 'Very Good' },
      { min: 2, max: 3.9, interpretation: 'Good' },
      { min: 0.1, max: 1.9, interpretation: 'Fair' },
      { exact: 0, interpretation: 'Needs Improvement' }, // fingers just touched
      { max: -0.1, interpretation: 'Poor' }, // negative overlap = gap
    ],
    videoInstructions: 'https://video.com',
  },
  {
    title: 'Push-Up',
    key: 'pushUp',
    equipment: ['Exercise mats of any clean mat'],
    instructionsForTester: [
      'Lie down on the mat; face down in standard push-up position: palms on the mat about shoulder width, fingers pointing forward, and legs straight, parallel, and slightly apart, with the toes supporting the feet.',
      'FOR BOYS: Straighten the arms, keeping the back and knees straight, then lower the arms until there is a 90-degree angle at the elbows (upper arms are parallel to the floor). FOR GIRLS: With knees in contact with the floor, straightens the arms, keeping the back straight, then lowers the arms until there is a 90-degree angle at the elbows (upper arms are parallel to the floor). ',
      'Perform as many repetitions as possible, maintaining a cadence of 20 push-ups per minute. (2 seconds going down and I sec going up). ',
      'A maximum of 50 push-ups for boys and 25 push-ups for girls. ',
    ],
    instructionsForPartner: [
      'As the tester assumes the position of push-up, start counting as the tester lowers his/her body until he/she reaches 90-degree angle at the elbow. The partner should stand in front of the tester and his/her eyes should be close to elbow level to accurately judge the 90 degrees bend. ',
      'ake sure that the performer executes the push-ups in the correct form.',
      'The test is terminated when the performer can no longer execute the push-ups in the correct form, is in pain, voluntarily stops, or cadence is broken. ',
    ],
    instructionsScoring: [
      'Count the number of correctly executed push-ups without rest.',
    ],
    classification: [
      { min: 6, interpretation: 'Excellent' },
      { min: 4, max: 5.9, interpretation: 'Very Good' },
      { min: 2, max: 3.9, interpretation: 'Good' },
      { min: 0.1, max: 1.9, interpretation: 'Fair' },
      { exact: 0, interpretation: 'Needs Improvement' },
      { max: -0.1, interpretation: 'Poor' },
    ],
    videoInstructions: 'https://video.com',
  },
  {
    title: 'Sit and Reach',
    key: 'sitAndReach',
    equipment: [
      'Sit and Reach Box (or a ruler/tape measure fixed on a flat surface)',
      'Mat (optional for comfort)',
    ],
    instructionsForTester: [
      'Sit on the floor with legs extended straight ahead, feet about 12 inches apart, and soles flat against the box or marked surface.',
      'Keep knees straight and place one hand on top of the other.',
      'Slowly bend forward and reach as far as possible without bouncing, holding the position for at least 2 seconds.',
      'Ensure the fingertips move along the measuring line or ruler.',
    ],
    instructionsForPartner: [
      'Ensure the tester keeps their knees straight during the reach.',
      'Measure the farthest point the fingertips reach to the nearest 0.1 cm.',
      'Do not allow jerky or bouncing movements; only measure the best of two trials.',
    ],
    instructionsScoring: [
      'Measure the reach distance in centimeters from the baseline (zero point on the Sit and Reach box).',
      'Scores above the baseline are positive; those not reaching it are recorded as negative.',
    ],
    classification: [
      { min: 6, interpretation: 'Excellent' },
      { min: 4, max: 5.9, interpretation: 'Very Good' },
      { min: 2, max: 3.9, interpretation: 'Good' },
      { min: 0.1, max: 1.9, interpretation: 'Fair' },
      { exact: 0, interpretation: 'Needs Improvement' },
      { max: -0.1, interpretation: 'Poor' },
    ],
    videoInstructions: 'https://video.com',
  },
  {
    title: '3-Minute Step Test',
    key: 'stepTest',
    equipment: [
      'Step with a height of 12 inches for secondary and 8 inches for elementaries',
      'Stopwatch or timer',
      'Drum, clapper, clicker, metronome with speaker or any similar device',
    ],
    instructionsForTester: [
      'Stand at least one foot away from the step or bench with trunk erect and eyes looking straight ahead. ',
      'The first step of the sequence should be alternate. At the signal "Go," step up and down the step/bench for 3 minutes at a rate of 96 beats per minute. One step consists of 4 beats — up with the left foot (ct. 1), up with the right foot (ct. 2), down with the left foot (ct. 3), down with the right foot (ct. 4) for the first sequence. Then up with the right foot (ct.1), up with the left foot (ct. 2), down with the right foot (ct. 3), down with the left foot (ct. 4) for the second sequence. Observe proper breathing (inhale through the nose, exhale through the mouth). ',
      'Immediately after the exercise, stand and locate your pulse and in five (5) seconds, or at a signal, start to get the heart rate. ',
      'Dont talk while taking the pulse beat.',
      'Count the pulse beat for 10 seconds and multiply it by 6.',
    ],
    instructionsForPartner: [
      'As the student assumes the position in front of the step, signal, "Ready" and "Go", start the stopwatch for the 3-minute step test.',
      'After the test, allow performer to locate his/her pulse in 5 seconds.',
      'Give the signal to count the pulse beat.',
      'Let the performer count his/her pulse beat for 10 seconds and multiply it by 6.',
    ],
    instructionsScoring: [
      'Record the 60-second pulse rate immediately after the activity.',
    ],
    videoInstructions: 'https://video.com',
  },
  {
    title: 'Basic Plank',
    key: 'basicPlank',
    purpose: ['To measure strength/stability of the core muscles'],
    equipment: ['Exercise mats or any clean mat, stop watch/time piece'],
    instructionsForTester: [
      'Assume a push — up position. Rest body on forearms with palms and fingers flat on the floor. Elbows are aligned with the shoulders.', 
      'legs are straight with ankles, knees and thighs touching together.', 
      'Support weight on forearms and toes; make sure that your back is flat. head. neck and spine are in a straight line. ',
      'Keep abdominals engaged/contracted; do not let stomach drop or allow hips to rise.',
    ],
    instructionsForPartner: [
      'Ensure the availability of a mat/smooth flooring or anything that can protect the forearms.',
      'Give the signal "Start/Go" and start/press the time piece.',
      'Make sure that the back of the head, neck, spine and ankles are in a straight line',
      'Give two (2) warnings.',
      'Stop the time when the performer can no longer hold the required position, or, when the performer has held the position for at least 90 seconds.',
      'Holding the plank position beyond 90 seconds is considered unnecessary.',
    ],
    instructionsScoring: [
      'Record the time in seconds. Maximum of 90 seconds for Boys and Girls',
    ],
    classification: [
      { min: 51, interpretation: 'Excellent' },
      { min: 46, max: 50, interpretation: 'Very Good' },
      { min: 31, max: 45, interpretation: 'Good' },
      { min: 16, max: 30, interpretation: 'Fair' },
      { min: 1, max: 15, interpretation: 'Needs Improvement' },
    ],
    videoInstructions: 'https://video.com',
  },
];
