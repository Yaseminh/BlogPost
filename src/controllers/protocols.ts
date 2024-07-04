export interface HttpResponse<T> {
    statusCode: HttpStatusCode;
    body: T;
  }
  
  export interface HttpRequest<B> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers?: any;
    body?: B;
  }
  
  export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
  }
  
  export interface IController {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
  }