import supabase from '@/client/supabase';
import { shuffleArray } from '@/utilities/utils';

async function fetchQuizzes() {
  const user = await getCurrentUser();
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
    .order('id', { ascending: true })
    .eq('quiz_progress.user_id', user.id);

  if (error) {
    console.error('Error fetching quizzes:', error);
    return;
  }

  console.log('Quizzes:', data);
  return data;
}

function extractQuizDetails(quizData) {
  if (!Array.isArray(quizData) || quizData.length === 0) return;
  quizData.map(async (quiz, index) => {
    let progress = quiz.quiz_progress[0] || [];
    console.log('quiz', progress);
    quiz.number = quiz.id;
    quiz.status = (progress && progress.status) || 'Locked';
    quiz.details = !progress.date_taken
      ? {}
      : {
          Score: `${progress.score}/${progress.total_items}`,
          Ranking: await getUserRanking(quiz.id),
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
  const user = await getCurrentUser();
  let questions = await getQuestionsFromQuizProgressIfExists(quizId);

  if (!questions) {
    questions = shuffleQuizQuestionsAndChoices(
      await getQuestionsFromQuiz(quizId),
    );

    const { data, error } = await supabase
      .from('quiz_progress')
      .update({
        start_time: new Date().toISOString(),
        questions_shuffled: questions,
      })
      .eq('user_id', user.id)
      .eq('quiz_id', quizId);

    if (error) {
      console.error(
        'Error updating questions shuffled and starting quiz:',
        error,
      );
    } else {
      console.log('Updating questions shuffled and quiz started:', data);
    }
  }

  return questions;
}

function shuffleQuizQuestionsAndChoices(questions) {
  // shuffle questions
  const shuffledQuestions = shuffleArray(questions).map((question) => {
    if (question.type === 'identification') return question; // skip identification questions
    return {
      ...question,
      choices: shuffleArray(question.choices), // shuffle choices for each question
    };
  });

  return shuffledQuestions;
}

async function getQuestionsFromQuizProgressIfExists(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select(`questions_shuffled`)
    .eq('quiz_id', quizId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching shuffled questions:', error);
  }

  console.log('Questions shuffled:', data.questions_shuffled);
  return data ? data.questions_shuffled : null;
}

async function getQuestionsFromQuiz(quizId) {
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

async function fetchQuizStateIfExists(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select(
      'user_id, quiz_id, question_index, score, points, status, remaining_time, questions_answered, start_time, total_items',
    )
    .eq('quiz_id', quizId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching quiz state:', error.message);
  }

  console.log('Quiz state:', data);

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
    remainingTime: quizState.remaining_time || 0,
    questionsAnswered: quizState.questions_answered || [],
  };
}

// function updateQuestionsRemaining(quizState, questions) {
//   if (!quizState || !questions) return questions;
//   if (
//     quizState.questionIndex === 0 ||
//     !quizState.questionsAnswered ||
//     quizState.status === 'Done'
//   )
//     return questions;

//   const answeredSet = new Set(
//     quizState.questionsAnswered.map((q) => q.question),
//   );

//   const answeredQuestions = questions.filter((q) =>
//     answeredSet.has(q.question),
//   );
//   console.log('Answered Questions:', answeredQuestions);

//   const unansweredQuestions = questions.filter(
//     (q) => !answeredSet.has(q.question),
//   );
//   console.log('Unanswered Questions:', unansweredQuestions);

//   const allQuestions = [...answeredQuestions, ...unansweredQuestions];

//   console.log('Merged Questions:', allQuestions);

//   return allQuestions;

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
// }

async function submitAnswer(quizState) {
  const {
    quizId,
    questionIndex,
    score,
    points,
    remainingTime,
    questionsAnswered,
  } = quizState;
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
      remaining_time: remainingTime,
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
      question_index: questionIndex,
      status: status,
      total_items: questionIndex + 1,
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

async function updateRemainingTime(quizId, remainingTime) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .update({
      remaining_time: remainingTime,
    })
    .eq('user_id', user.id)
    .eq('quiz_id', quizId);

  if (error) {
    console.error('Error updating remaining time:', error.message);
    return error;
  } else {
    console.log('Remaining time updated:', data);
  }
}

async function getUserRanking(quizId) {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('user_id, score')
    .eq('quiz_id', quizId)
    .eq('status', 'Done')
    .order('points', { ascending: false });

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
        full_name
      )
    `,
    )
    .eq('quiz_id', quizId)
    .eq('status', 'Done')
    .order('points', { ascending: false })
    .limit(5);

  const leaderboard = data.map((user, index) => {
    return {
      rank: index + 1,
      name: user.profile.full_name,
      points: user.points.toLocaleString(),
    };
  });

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return;
  }

  console.log('Leaderboard:', data);

  return leaderboard;
}

export {
  fetchQuizzes,
  extractQuizDetails,
  fetchQuizQuestions,
  getCurrentUser,
  getUserRanking,
  fetchLeaderboard,
  fetchQuizStateIfExists,
  extractQuizState,
  submitAnswer,
  markQuizAsDone,
  updateRemainingTime,
};
