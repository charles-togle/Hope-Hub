// Import videos
import warmUpVideo from '@/assets/videos/exercises/video_warm_ups.mp4';

// Upper Body
import shoulderPressVideo from '@/assets/videos/exercises/video_shoulder_press.mp4';
import inclineChestPressVideo from '@/assets/videos/exercises/video_incline_chest_press.mp4';
import standingDumbbellOverheadPressVideo from '@/assets/videos/exercises/video_standing_dumbbell_overhead_press.mp4';
import closeGripLatPulldownVideo from '@/assets/videos/exercises/video_close_grip_lat_pulldown.mp4';
import tricepPulldownVideo from '@/assets/videos/exercises/video_triceps_pulldown.mp4';
import russianTwist from '@/assets/videos/exercises/video_russian_twist.mp4';
// import lyingChestPressVideo from '@/assets/videos/exercises/video_lying_chest_press.mp4';

// Lower Body
import deadliftVideo from '@/assets/videos/exercises/video_deadlift.mp4';
import squatsVideo from '@/assets/videos/exercises/video_squats.mp4';
import kettleBellSumoDeadlift from '@/assets/videos/exercises/video_kettle_bell_sumo_deadlift.mp4';

// import lungesVideo from '@/assets/videos/exercises/video_lunges.mp4';
// import splitSquatsVideo from '@/assets/videos/exercises/video_split_squats.mp4';
// import calfRaisesVideo from '@/assets/videos/exercises/video_calf_raises.mp4';
// import bicepCurlVideo from '@/assets/videos/exercises/video_bicep_curl.mp4';

// Import covers
import warmUpCover from '@/assets/covers/exercises/cover_warm_ups.jpg';
import shoulderPressCover from '@/assets/covers/exercises/cover_shoulder_press.jpg';
import inclineChestPressCover from '@/assets/covers/exercises/cover_incline_chest_press.jpg';
import standingDumbbellOverheadPressCover from '@/assets/covers/exercises/cover_standing_dumbbell_overhead_press.jpg';
import closeGripLatPulldownCover from '@/assets/covers/exercises/cover_close_grip_lat_pulldown.jpg';
import tricepsPulldownCover from '@/assets/covers/exercises/cover_triceps_pulldown.jpg';
// import seatedChestPressCover from '@/assets/covers/exercises/cover_seated_chest_press.jpg';
// import lyingChestPressCover from '@/assets/covers/exercises/cover_lying_chest_press.jpg';
import deadliftCover from '@/assets/covers/exercises/cover_deadlift.jpg';
import squatsCover from '@/assets/covers/exercises/cover_squats.jpg';
// import lungesCover from '@/assets/covers/exercises/cover_lunges.jpg';
// import bicepCurlCover from '@/assets/covers/exercises/cover_bicep_curl.jpg';

export const WarmUpVideo = [
  {
    thumbnail: warmUpCover,
    url: 'warm-up',
    duration: '02:17',
    title: 'Warm Up',
    description: {
      howToDoIt:
        'Sit or stand up straight with a weight in each hand at shoulder height. Push the weights straight up until your arms are straight, then lower them slowly back down.',
      do: ['Keep your back straight.', 'Press the weights slowly.'],
      dont: ["Don't arch your back.", "Don't lock your elbows."],
    },
    videoLink: warmUpVideo,
    uploadDate: '2025-08-21T14:48:00.000Z',
  },
];

export const UpperBodyVideos = [
  {
    thumbnail: shoulderPressCover,
    url: 'shoulder-press',
    duration: '00:44',
    title: 'Shoulder Press',
    description: {
      howToDoIt:
        'Sit or stand up straight with a weight in each hand at shoulder height. Push the weights straight up until your arms are straight, then lower them slowly back down.',
      do: ['Keep your back straight.', 'Press the weights slowly.'],
      dont: ["Don't arch your back.", "Don't lock your elbows."],
    },
    videoLink: shoulderPressVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: inclineChestPressCover,
    url: 'incline-chest-press',
    duration: '00:56',
    title: 'Incline Chest Press',
    description: {
      howToDoIt:
        'Sit or stand up straight with a weight in each hand at shoulder height. Push the weights straight up until your arms are straight, then lower them slowly back down.',
      do: ['Keep your back straight.', 'Press the weights slowly.'],
      dont: ["Don't arch your back.", "Don't lock your elbows."],
    },
    videoLink: inclineChestPressVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: standingDumbbellOverheadPressCover,
    url: 'standing-dumbell-overhead',
    duration: '00:51',
    title: 'Standing Dumbbell Overhead Press',
    description: {
      howToDoIt:
        'Sit or stand up straight with a weight in each hand at shoulder height. Push the weights straight up until your arms are straight, then lower them slowly back down.',
      do: ['Keep your back straight.', 'Press the weights slowly.'],
      dont: ["Don't arch your back.", "Don't lock your elbows."],
    },
    videoLink: standingDumbbellOverheadPressVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: closeGripLatPulldownCover,
    url: 'close-grip-lat-pulldown',
    duration: '00:49',
    title: 'Close Grip Lat Pulldown',
    description: {
      howToDoIt:
        'Sit at the lat pulldown machine. Pull the bar down to your chest, then let it go back up slowly.',
      do: ['Sit up tall.', 'Pull with your back muscles.'],
      dont: ["Don't lean back too far.", "Don't pull behind your head."],
    },
    videoLink: closeGripLatPulldownVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: tricepsPulldownCover,
    url: 'triceps-pulldown',
    duration: '00:33',
    title: 'Triceps Pulldown',
    description: {
      howToDoIt:
        'Stand at a cable machine with a bar or rope. Push it down until your arms are straight, then let it come back up slowly.',
      do: [
        'Keep your elbows still and close to your body.',
        'Use a full range of motion.',
      ],
      dont: ["Don't move your shoulders.", "Don't lean too far forward."],
    },
    videoLink: tricepPulldownVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'seated-chest-press',
    duration: '00:45',
    title: 'Seated Chest Press',
    description: {
      howToDoIt:
        'Sit on the machine with your feet flat. Push the handles forward until your arms are straight. Slowly bring the handles back.',
      do: [
        'Adjust the seat so the handles are at chest level.',
        'Keep your back against the seat.',
      ],
      dont: ["Don't lift your shoulders.", "Don't rush the movement."],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'lying-chest-press',
    duration: '00:46',
    title: 'Lying Chest Press',
    description: {
      howToDoIt:
        'Lie on a bench with a weight in each hand or use a barbell. Lower the weights to your chest. Push them back up.',
      do: ['Keep your feet flat on the floor.', 'Lower the weights slowly.'],
      dont: [
        "Don't let your back lift off the bench.",
        "Don't bounce the weights.",
      ],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'bicep-curl',
    duration: '00:40',
    title: 'Bicep Curl',
    description: {
      howToDoIt:
        'Hold a dumbbell in each hand, arms at your sides. Curl the weights up to your shoulders. Lower slowly.',
      do: ['Keep your elbows close to your body.', 'Lift slowly.'],
      dont: ["Don't swing your body.", "Don't use your shoulders."],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'russian-twist',
    duration: '00:33',
    title: 'Russian Twist',
    description: {
      howToDoIt: '',
      do: [''],
      dont: [''],
    },
    videoLink: russianTwist,
    uploadDate: '2025-08-28T14:02:00.000Z',
  },
];

export const LowerBodyVideos = [
  {
    thumbnail: deadliftCover,
    url: 'deadlift',
    duration: '01:08',
    title: 'Deadlifts',
    description: {
      howToDoIt:
        'Stand with feet hip-width apart and a barbell (or dumbbells) in front of you. Hinge at the hips and slightly bend your knees to grip the weight. Keep your back flat and chest up. Drive through your heels to lift the weight, extending your hips and knees fully. Lower it back down with control by hinging at the hips again.',
      do: [
        'Engage your core and keep your back straight.',
        'Use your legs and glutes to lift.',
        'Keep the bar or weights close to your body.',
      ],
      dont: [
        "Don't round your back.",
        "Don't yank the weight up with your arms.",
        "Don't hyperextend your back at the top.",
      ],
    },
    videoLink: deadliftVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: squatsCover,
    url: 'squats',
    duration: '00:43',
    title: 'Squats',
    description: {
      howToDoIt:
        'Stand with feet shoulder-width apart and toes slightly turned out. Keep your chest lifted and back straight. Bend your hips and knees to lower your body as if sitting in a chair. Go as low as you can while keeping heels on the ground. Push through your heels to return to standing.',
      do: [
        'Keep knees aligned with toes.',
        'Engage your core throughout the movement.',
        'Squat to at least parallel if your flexibility allows.',
      ],
      dont: [
        "Don't let your knees collapse inward.",
        "Don't rise onto your toes.",
        "Don't arch or round your back.",
      ],
    },
    videoLink: squatsVideo,
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'lunges',
    duration: '00:50',
    title: 'Lunges',
    description: {
      howToDoIt:
        'Stand upright with feet hip-width apart. Step forward with one leg, lowering your hips until both knees are bent at about 90 degrees. Push back up to the starting position and repeat on the other leg.',
      do: [
        'Keep your torso upright.',
        'Step forward far enough to create a 90-degree angle.',
        'Keep your front knee aligned with your ankle.',
      ],
      dont: [
        'Let your front knee go beyond your toes.',
        'Let your upper body lean forward or twist.',
        'Bounce off the back foot.',
      ],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'split-squats',
    duration: '00:48',
    title: 'Split Squats',
    description: {
      howToDoIt:
        'Stand with one foot forward and the other behind you in a split stance. Lower your back knee toward the ground while keeping your torso upright. Push through the front heel to return to the starting position.',
      do: [
        'Keep your chest up and back straight.',
        'Ensure your front knee tracks over your ankle.',
        'Lower under control and push through your heel.',
      ],
      dont: [
        'Let your front knee go past your toes.',
        'Lean your upper body forward.',
        'Rush the movement or lose balance.',
      ],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'calf-raises',
    duration: '00:30',
    title: 'Calf Raises',
    description: {
      howToDoIt:
        'Stand upright with your feet hip-width apart. Slowly raise your heels off the ground, standing on your toes. Hold for a moment at the top. Lower your heels back down with control.',
      do: [
        'Keep your core tight and body tall.',
        'Use slow, controlled motion.',
        'Try doing them on a step for a fuller range of motion.',
      ],
      dont: [
        "Don't bounce or rush through the reps.",
        "Don't roll your ankles outward or inward.",
        "Don't lean your body forward.",
      ],
    },
    videoLink: '',
    uploadDate: '2025-07-23T14:00:00.000Z',
  },
  {
    thumbnail: '',
    url: 'kettle-bell-sumo-deadlift',
    duration: '01:18',
    title: 'Kettle Bell Sumo Deadlift',
    description: {
      howToDoIt: '',
      do: [''],
      dont: [''],
    },
    videoLink: kettleBellSumoDeadlift,
    uploadDate: '2025-08-28T14:02:00.000Z',
  },
];

export const References = [
  {
    name: '[1] Davis, N. (2022, June 28). How to do a goblet squat — and why you should. *Healthline*.',
    link: 'https://www.healthline.com/health/fitness-exercise/dumbbell-goblet-squat',
  },
  {
    name: '[2] Exercise Library: Romanian deadlift. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/317/romanian-deadlift/',
  },
  {
    name: '[3] Exercise Library: Seated chest press. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/',
  },
  {
    name: '[4] Exercise Library: Seated overhead press. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/45/seated-overhead-press/',
  },
  {
    name: '[5] Exercise Library: Seated shoulder press. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/186/seated-shoulder-press/',
  },
  {
    name: '[6] Exercise Library: Triceps Pushdowns. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/185/triceps-pushdowns/',
  },
  {
    name: '[7] Hammer strength machine incline bench press: Video exercise guide & tips. (2017, November 27). *Muscle & Strength*.',
    link: 'https://www.muscleandstrength.com/exercises/hammer-strength-incline-bench-press',
  },
  {
    name: '[8] How to do a dumbbell overhead press: Techniques, benefits, variations. (2007, July 24). *Verywell Fit*.',
    link: 'https://www.verywellfit.com/how-to-do-the-dumbbell-overhead-press-3498298',
  },
  {
    name: '[9] How to use a chest press machine: Benefits and variations. (2008, November 7). *Verywell Fit*.',
    link: 'https://www.verywellfit.com/how-to-do-the-seated-machine-chest-press-3498292',
  },
  {
    name: "[10] LAMPA, T., BREITOWICH, A., & SMITH, J. (2025, March 20). If regular squats are boring, try one of these variations. *Women's Health*.",
    link: 'https://www.womenshealthmag.com/fitness/a19904135/types-of-squats/',
  },
  {
    name: '[11] Read, T. (2023, July 13). Deadlift benefits: 8 ways this exercise supercharges results. *Healthline*.',
    link: 'https://www.healthline.com/health/fitness/deadlift-benefits#what-they-are',
  },
  {
    name: '[12] Rogers, P. (2024, May 10). How to do Tricep Pushdowns: Techniques, benefits, variations. *Verywell Fit*.',
    link: 'https://www.verywellfit.com/how-to-do-the-triceps-pushdown-3498613',
  },
  {
    name: '[13] Seated close-grip chest press. (n.d.). *Health and Fitness Certifications, Continuing Education & Resources | ACE*.',
    link: 'https://www.acefitness.org/resources/everyone/exercise-library/189/seated-close-grip-chest-press/',
  },
];
