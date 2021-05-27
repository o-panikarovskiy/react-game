import { parseFetchError } from '../utils/parse-fetch-error';
import { Answer, AnswerResponse, GameStatus, Player, Question } from './models';

const STORAGE_KEY = 'players';
type PlayersMap = { [k: string]: Player };

const getOrCreatePlayer = async (name: string, signal?: AbortSignal): Promise<Player> => {
  return { name, score: 0, health: 3 };
};

const getAllQuestions = async (signal?: AbortSignal): Promise<readonly Question[]> => {
  try {
    const res = await fetch('../data/questions.json', { signal });
    const questions: Question[] = await res.json();

    const last = questions[questions.length - 1];
    questions[questions.length - 1] = { ...last, isLast: true };

    return questions;
  } catch (error) {
    throw parseFetchError(error);
  }
};

const setAnswer = async (p: Player, q: Question, a: Answer, signal?: AbortSignal): Promise<AnswerResponse> => {
  const score = p.score + (a.right ? q.score : 0);
  const health = p.health - (a.right ? 0 : 1);

  const player = { ...p, score, health };
  const gameStatus: GameStatus = q.isLast || player.health === 0 ? 'finished' : 'started';

  savePlayer(player);

  return { player, gameStatus };
};

const getRatings = async (top = 5, signal?: AbortSignal): Promise<readonly Player[]> => {
  const players: PlayersMap = JSON.parse(localStorage.getItem(STORAGE_KEY) as string) || {};

  return Object.values(players)
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
};

const savePlayer = (player: Player) => {
  const players: PlayersMap = JSON.parse(localStorage.getItem(STORAGE_KEY) as string) || {};
  players[player.name] = player;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

const backend = {
  getOrCreatePlayer,
  getAllQuestions,
  setAnswer,
  getRatings,
};

export default backend;
