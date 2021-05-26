import { parseFetchError } from '../utils/parse-fetch-error';
import { Answer, AnswerResponse, GameStatus, Player, Question } from './models';

const STORAGE_KEY = 'players';
type PlayersMap = { [k: string]: Player };

export const getOrCreatePlayer = async (name: string): Promise<Player> => {
  return { name, score: 0, health: 3 };
};

export const getAllQuestions = async (): Promise<readonly Question[]> => {
  try {
    const res = await fetch('../data/questions.json');
    const questions: Question[] = await res.json();

    const last = questions[questions.length - 1];
    questions[questions.length - 1] = { ...last, isLast: true };

    return questions;
  } catch (error) {
    throw parseFetchError(error);
  }
};

export const setAnswer = async (p: Player, question: Question, answer: Answer): Promise<AnswerResponse> => {
  const score = p.score + (answer.right ? question.score : 0);
  const health = p.health - (answer.right ? 0 : 1);

  const player = { ...p, score, health };
  const gameStatus: GameStatus = question.isLast || player.health === 0 ? 'finished' : 'started';

  savePlayer(player);

  return { player, gameStatus };
};

export const getRatings = async (): Promise<readonly Player[]> => {
  const players: PlayersMap = JSON.parse(localStorage.getItem(STORAGE_KEY) as string) || {};

  return Object.values(players)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

const savePlayer = (player: Player) => {
  const players: PlayersMap = JSON.parse(localStorage.getItem(STORAGE_KEY) as string) || {};
  players[player.name] = player;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};
