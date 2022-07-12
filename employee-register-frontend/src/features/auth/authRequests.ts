import { IUser } from "./authSlice"
import jwtDecode from "jwt-decode";

interface IAuthorizeResponse {
  response?: {
    user: IUser
    jwtToken: string
  }
  error?: string
}

async function authorize(username: string, password: string): Promise<IAuthorizeResponse> {
  const response = await fetch('http://localhost:1337/api/v1/employee/token', {
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
  const response = await fetch('http://localhost:1337/api/v1/employee/me', {
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

export { authorize, loadTokenFromLocalStorage }