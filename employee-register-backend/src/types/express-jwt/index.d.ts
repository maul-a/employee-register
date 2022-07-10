interface UserObj extends Express.User {
    userId: string
    user: import('@app/models/User').IUser
  }
  
  declare namespace Express {
      interface Request {
          user?: UserObj;
      }
    }