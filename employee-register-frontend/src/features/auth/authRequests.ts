import { IUser } from "./authSlice"
import jwtDecode from "jwt-decode";
import { IEmployee } from "../employees/employeesSlice";

interface IAuthorizeResponse {
  response?: {
    user: IUser
    jwtToken: string
  }
  error?: string
}

const BASE_URL = process.env['NODE_ENV'] === 'production' ? '' : 'http://localhost:1337'

async function register(employee: Omit<IEmployee, 'id'>) {
  const response = await fetch(`${BASE_URL}/api/v1/employee/me`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: employee.authData?.username,
      password: employee.authData?.password,
      email: employee.authData?.email,
      personalData: {
        role: employee.role,
        firstName: employee.firstName,
        lastName: employee.lastName,
        address: employee.address,
      }
    })
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }

}

async function authorize(username: string, password: string): Promise<IAuthorizeResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee/token`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function loadTokenFromLocalStorage() {
  const jwtToken = localStorage.getItem('jwtToken')
  if (!jwtToken) {
    return
  }
  const jwtTokenDecoded = jwtDecode(jwtToken) as any
  if (!jwtTokenDecoded || !jwtTokenDecoded['exp']) {
    return
  }
  if (Date.now() >= jwtTokenDecoded['exp'] * 1000) {
    return
  }
  const response = await fetch(`${BASE_URL}/api/v1/employee/me`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
  })
  const json = await response.json()
  return { user: json, jwtToken }
}

export { authorize, register, loadTokenFromLocalStorage }