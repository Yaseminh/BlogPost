import { HttpResponse, HttpStatusCode } from "./protocols";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};