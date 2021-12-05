import Methods from '../enums/Methods';

export type RequestOptions = {
  headers: Record<string, string>;
  method: keyof typeof Methods;
  data: any;
  timeout: number;
  credentials: boolean;
  blob: boolean;
};
