export const PhysicalFitnessTest = [
  {
    title: 'Zipper Test',
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
    Classification: [
      { min: 6, interpretation: 'Excellent' },
      { min: 4, max: 5.9, interpretation: 'Very Good' },
      { min: 2, max: 3.9, interpretation: 'Good' },
      { min: 0.1, max: 1.9, interpretation: 'Fair' },
      { exact: 0, interpretation: 'Needs Improvement' }, // fingers just touched
      { max: -0.1, interpretation: 'Poor' }, // negative overlap = gap
    ],
    videoInstructions: "https://video.com",
  },
  {
    title: 'Push-Up',
    equipment: ['Flat, clean surface', 'Mat (optional)'],
    instructionsForTester: [
      'Assume a prone position on the mat or floor.',
      'Place hands slightly wider than shoulder-width apart.',
      'Keep body straight from head to heels.',
      'Lower the body until elbows are at 90 degrees.',
      'Push back up to the starting position.',
      'Repeat the movement as many times as possible without breaking form.',
    ],
    instructionsForPartner: [
      'Observe proper form: back must remain straight, elbows should bend to 90 degrees.',
      'Count only those repetitions performed with correct form.',
      'Stop the test once the tester cannot maintain correct form.',
    ],
    instructionsScoring: ['Count the number of correctly executed push-ups without rest.'],
    Classification: {
      pushUpElementaryBoys: [
        { min: 30, interpretation: 'Excellent' },
        { min: 25, max: 29, interpretation: 'Very Good' },
        { min: 20, max: 24, interpretation: 'Good' },
        { min: 15, max: 19, interpretation: 'Fair' },
        { max: 14, interpretation: 'Needs Improvement' },
      ],
      pushUpSecondaryBoys: [
        {
          ageRange: '13-14',
          ratings: [
            { min: 35, interpretation: 'Excellent' },
            { min: 30, max: 34, interpretation: 'Very Good' },
            { min: 25, max: 29, interpretation: 'Good' },
            { min: 20, max: 24, interpretation: 'Fair' },
            { max: 19, interpretation: 'Needs Improvement' },
          ],
        },
        {
          ageRange: '15-16',
          ratings: [
            { min: 40, interpretation: 'Excellent' },
            { min: 35, max: 39, interpretation: 'Very Good' },
            { min: 30, max: 34, interpretation: 'Good' },
            { min: 25, max: 29, interpretation: 'Fair' },
            { max: 24, interpretation: 'Needs Improvement' },
          ],
        },
        {
          ageRange: '17-18',
          ratings: [
            { min: 45, interpretation: 'Excellent' },
            { min: 40, max: 44, interpretation: 'Very Good' },
            { min: 35, max: 39, interpretation: 'Good' },
            { min: 30, max: 34, interpretation: 'Fair' },
            { max: 29, interpretation: 'Needs Improvement' },
          ],
        },
      ],
      pushUpSecondaryGirls: [
        {
          ageRange: '13-14',
          ratings: [
            { min: 30, interpretation: 'Excellent' },
            { min: 25, max: 29, interpretation: 'Very Good' },
            { min: 20, max: 24, interpretation: 'Good' },
            { min: 15, max: 19, interpretation: 'Fair' },
            { max: 14, interpretation: 'Needs Improvement' },
          ],
        },
        {
          ageRange: '15-16',
          ratings: [
            { min: 35, interpretation: 'Excellent' },
            { min: 30, max: 34, interpretation: 'Very Good' },
            { min: 25, max: 29, interpretation: 'Good' },
            { min: 20, max: 24, interpretation: 'Fair' },
            { max: 19, interpretation: 'Needs Improvement' },
          ],
        },
        {
          ageRange: '17-18',
          ratings: [
            { min: 40, interpretation: 'Excellent' },
            { min: 35, max: 39, interpretation: 'Very Good' },
            { min: 30, max: 34, interpretation: 'Good' },
            { min: 25, max: 29, interpretation: 'Fair' },
            { max: 24, interpretation: 'Needs Improvement' },
          ],
        },
      ],
    },
    videoInstructions: "https://video.com",
  },
  {
    title: 'Sit and Reach',
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
    Classification: {
      Boys: [
        { min: 35, interpretation: 'Excellent' },
        { min: 30, max: 34.9, interpretation: 'Very Good' },
        { min: 25, max: 29.9, interpretation: 'Good' },
        { min: 20, max: 24.9, interpretation: 'Fair' },
        { max: 19.9, interpretation: 'Needs Improvement' },
      ],
      Girls: [
        { min: 40, interpretation: 'Excellent' },
        { min: 35, max: 39.9, interpretation: 'Very Good' },
        { min: 30, max: 34.9, interpretation: 'Good' },
        { min: 25, max: 29.9, interpretation: 'Fair' },
        { max: 24.9, interpretation: 'Needs Improvement' },
      ],
    },
    videoInstructions: "https://video.com",
  },
  {
    title: '3-Minute Step Test',
    equipment: [
      'Step with a height of 12 inches',
      'Stopwatch or timer',
      'Metronome or music with 96 beats per minute',
      'Heart rate monitor or capability to take pulse manually',
    ],
    instructionsForTester: [
      'Step up and down on the step box for 3 minutes to the rhythm of 96 beats per minute (24 steps per minute).',
      'At the end of 3 minutes, sit down immediately.',
      'Within 5 seconds after stopping, take your pulse for a full 60 seconds.',
    ],
    instructionsForPartner: [
      'Ensure the tester maintains the correct pace.',
      'Use a stopwatch to time the full 3 minutes.',
      'Assist the tester in counting their pulse accurately for 60 seconds after stepping.',
    ],
    instructionsScoring: [
      'Record the 1-minute pulse rate immediately after the 3-minute step test.',
    ],
    Classification: {
      Boys: [
        { max: 84, interpretation: 'Excellent' },
        { min: 85, max: 94, interpretation: 'Very Good' },
        { min: 95, max: 104, interpretation: 'Good' },
        { min: 105, max: 114, interpretation: 'Fair' },
        { min: 115, interpretation: 'Needs Improvement' },
      ],
      Girls: [
        { max: 88, interpretation: 'Excellent' },
        { min: 89, max: 98, interpretation: 'Very Good' },
        { min: 99, max: 108, interpretation: 'Good' },
        { min: 109, max: 118, interpretation: 'Fair' },
        { min: 119, interpretation: 'Needs Improvement' },
      ],
    },
    videoInstructions: "https://video.com",
  },
  {
    title: 'Basic Plank',
    equipment: ['Exercise mats or any clean mat, stop watch/time piece'],
    instructionsForTester: [
      'Assume a push up position with forearms and toes on the ground.',
      'Keep the body straight from head to heels, elbows directly under shoulders.',
      'Hold this position as long as possible without letting the hips sag or pike.',
    ],
    instructionsForPartner: [
      'Start the timer once the tester is in correct plank position.',
      'Ensure the tester maintains proper form during the entire hold.',
      'Stop the timer as soon as the form breaks (e.g., hips sag, back arches, or tester drops).',
    ],
    instructionsScoring: [
      'Record the total time (in seconds) the plank was held with correct form.',
    ],
    Classification: {
      Boys: [
        { min: 120, interpretation: 'Excellent' },
        { min: 90, max: 119, interpretation: 'Very Good' },
        { min: 60, max: 89, interpretation: 'Good' },
        { min: 30, max: 59, interpretation: 'Fair' },
        { max: 29, interpretation: 'Needs Improvement' },
      ],
      Girls: [
        { min: 90, interpretation: 'Excellent' },
        { min: 60, max: 89, interpretation: 'Very Good' },
        { min: 45, max: 59, interpretation: 'Good' },
        { min: 30, max: 44, interpretation: 'Fair' },
        { max: 29, interpretation: 'Needs Improvement' },
      ],
    },
    videoInstructions: "https://video.com",
  },
];
