import JWT from 'express-jwt'
import dotenv from 'dotenv'
import { sign, verify } from 'jsonwebtoken'

dotenv.config()

export const JWT_SECRET = process.env['JWT_SECRET']!

export const jwtGuard = JWT({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
})

class JWTService {
  signJWT(userId: string) {
    const payload = { userId }
    return sign(payload, JWT_SECRET, { expiresIn: '1d' })    
  }
  
  verifyJWT(jwtString: string) {
    try {
      const decoded = verify(jwtString, JWT_SECRET)
      return decoded
    } catch(err) {
      console.error('an error occurred', err)
    }  
  }
}
export default JWTService