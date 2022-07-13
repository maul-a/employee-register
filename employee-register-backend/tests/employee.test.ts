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
let jwtToken:string

describe('GET /employee',  function() {
  it('should authorize', async function() {
    const response = await request.post('/employee/token').send({
      username: 'test',
      password: 'testtest',
    }) 
    jwtToken = await response.body.data.jwtToken

  })
  it('should return list of employees', async function() {
    const response = await request
      .get('/employee/')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
    expect(response.status).to.eql(200)
  })

  it('should not return list of employees (not authorized', async function() {
    const response = await request
      .get('/employee/')
      .send()
    expect(response.status).to.eql(403)
  })

  it('should return my profile (GET /employee/me)', async function() {
    const response = await request
      .get('/employee/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
    expect(response.status).to.eql(200)
  })
})


describe('Create employee', async function() {
  let employeeId:string
  it('should create a new employee', async function() {
    const response = await request.post('/employee')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        employee: {
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
    employeeId = response.body.data.employee.id
    expect(response.status).to.eql(200)
  })

  it('should return the new employee (using GET /employee/:id)', async function() {
    const response = await request.get(`/employee/${employeeId}`)
    expect(response.status).to.eql(200)
  })

  it('should return the new employee (using GET /employee)', async function() {
    const response = await request.get('/employee').set('Authorization', `Bearer ${jwtToken}`).send()
    const users: any[] = response.body.data.users
    const result = users.some(user => user.id === employeeId)
    expect(result).to.eql(true)
  })
  
})