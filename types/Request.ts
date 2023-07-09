
declare namespace Express {
    export interface Request {
      user: {
        sub: string
        email: string
      }
      post(options: any, callback: any): void;
    }
  }
