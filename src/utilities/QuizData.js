import supabase from '@/client/supabase';
import { shuffleArray } from '@/utilities/utils';

async function fetchQuizzes() {
  const user = await getCurrentUser();

  const { data, error } = user
    ? await fetchQuizzesOfUser(user)
    : await fetchQuizzesDefault();

  if (error) {
    console.error('Error fetching quizzes:', error);
    return;
  }

  return data;
}

async function fetchQuizzesDefault() {
  const { data, error } = await supabase
    .from('quiz')
    .select(
      `
    id,
    title,
    lecture_title,
    description,
    questions`,
    )
    .order('id', { ascending: true });

  return { data, error };
}

async function fetchQuizzesOfUser(user) {
  const { data, error } = await supabase
    .from('quiz')
    .select(
      `
    id,
    title,
    lecture_title,
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

  return { data, error };
}

function extractQuizDetails(quizData) {
  if (!Array.isArray(quizData) || quizData.length === 0) return;
  quizData.map(async (quiz, index) => {
    let progress = (quiz.quiz_progress && quiz.quiz_progress[0]) || [];
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
          ['Start-time']: new Date(progress.start_time).toLocaleTimeString(
            'en-US',
            {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            },
          ),

          ['End-time']: new Date(progress.end_time).toLocaleTimeString(
            'en-US',
            {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            },
          ),
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

  // Get user ranking
  const userRanking = data
    .map((item, index) => ({
      user_id: item.user_id,
      score: item.score,
      rank: index + 1,
    }))
    .find((item) => item.user_id === user.id).rank;

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

  const currentUser = await getCurrentUser();
  const leaderboard = data.map((user, index) => {
    return {
      rank: index + 1,
      name: user.profile.full_name,
      points: user.points.toLocaleString(),
      isCurrentUser: user.user_id === currentUser.id,
    };
  });

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return;
  }

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
