export type AppError = {
  readonly status: number;
  readonly code: number;
  readonly name: string;
  readonly message: string;
};
