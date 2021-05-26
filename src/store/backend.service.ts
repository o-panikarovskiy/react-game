import { parseFetchError } from '../utils/parse-fetch-error';
import { Answer, AnswerResponse, Player, Question } from './models';

export const getOrCreatePlayer = async (name: string): Promise<Player> => {
  return { name, score: 0, health: 3 };
};

export const getAllQuestions = async (): Promise<readonly Question[]> => {
  try {
    const res = await fetch('../data/questions.json');
    const data = await res.json();
    return data;
  } catch (error) {
    throw parseFetchError(error);
  }
};

export const setAnswer = async (player: Player, question: Question, answer: Answer): Promise<AnswerResponse> => {
  const score = player.score + (answer.right ? question.score : 0);
  const health = player.health - (answer.right ? 0 : 1);
  player = { ...player, score, health };

  return {
    player,
    ratings: getRatings(player),
  };
};

const getRatings = (player: Player): readonly Player[] => {
  const players: { [k: string]: Player } = JSON.parse(localStorage.getItem('players') as string) || {};
  players[player.name] = player;
  localStorage.setItem('players', JSON.stringify(players));

  return Object.values(players).sort((a, b) => b.score - a.score);
};
