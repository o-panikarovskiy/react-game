import { parseFetchError } from '../utils/parse-fetch-error';
import { Question } from './models';

export const getAll = async (signal?: AbortSignal): Promise<readonly Question[]> => {
  try {
    const res = await fetch('../data/questions.json', { signal });
    const data = await res.json();
    return data;
  } catch (error) {
    throw parseFetchError(error);
  }
};
