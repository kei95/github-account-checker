export type User = Readonly<{
  login: string;
  avatar_url: string;
  id: number;
  html_url: string;
}>;

export type Repository = Readonly<{
  id: number;
  name: string;
  html_url: string;
}>;

export type Response<T> =
  | {
      status: "success";
      res: T;
    }
  | {
      status: "failure";
      message: string;
    };
