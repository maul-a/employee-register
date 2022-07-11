interface UserObj extends Express.User {
    userId: string
    user: import('@app/models/Employee').IEmployee
  }
  
  declare namespace Express {
      interface Request {
          user?: UserObj;
      }
    }