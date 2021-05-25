import { AppError } from '../types/http-error';

export const parseFetchError = (error: any): AppError => {
  const message = error?.message || 'Something went wrong';
  const code = error?.code || 0;
  const status = error?.status || -1;
  const name = error?.name || 'UnknownError';
  return { message, code, status, name };
};
