import supertest  from 'supertest'
import { expect } from 'chai'
import dotenv from 'dotenv'

dotenv.config()



const BASE_URL = process.env['BASE_URL']
if (!BASE_URL) {
  console.log('BASE_URL is not defined')
  process.exit(1)
}
const request = supertest(`${BASE_URL}/api/v1`)

let jwtToken
describe('Registration and authorization use-case', function() {
  it('should register a new employee', async function() {
    const response = await request.post('/employee/me').send({
      username: 'test',
      email: 'test@test.com',
      password: 'testtest',
      personalData: {
        firstName: 'test',
        lastName: 'test',
        role: 'test',
        address: {
          street: 'test',
          streetNr: 'test',
          ZIP: 'test',
          place: 'test',
          country: 'DE',
        }
      }
    })
    expect(response.status).to.eql(200)
  })
  it('should authorize', async function() {
    const response = await request.post('/employee/token').send({
      username: 'test',
      password: 'testtest',
    })
    jwtToken = await response.body.data.jwtToken
    expect(response.status).to.eql(200)
  })
  it('should not authorize (wrong password)', async function() {
    const response = await request.post('/employee/token').send({
      username: 'test',
      password: 'wrong password',
    })
    expect(response.status).to.eql(400)
  })
})