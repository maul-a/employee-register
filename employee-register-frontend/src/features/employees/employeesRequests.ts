import { IEmployee } from "./employeesSlice"

interface IGetEmployeeListResponse {
  response?: IEmployee[]
  error?: string
}

interface IGetEmployeeResponse {
  response?: IEmployee & {hasAuthData: boolean}
  error?: string
}

interface ICreateEmployeeResponse {
  response?: IEmployee
  error?: string
}

interface IDeleteEmployeeResponse {
  response?: string
  error?: string
}

const BASE_URL = process.env['NODE_ENV'] === 'production' ? '' : 'http://localhost:1337'

async function deleteEmployee(jwtToken: string, userId: string): Promise<IDeleteEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee/${userId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
  })
  if (response.ok) {
    const json = await response.json()
    return { response: userId }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function updateEmployee(jwtToken: string, id: string, employee: Omit<IEmployee, 'id'>): Promise<ICreateEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      employee
    })
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data.employee }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function createEmployee(jwtToken: string, employee: Omit<IEmployee, 'id'>): Promise<ICreateEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      employee
    })
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data.employee }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function requestEmployee(id: string): Promise<IGetEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data.employee }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function requestEmployeeList(jwtToken: string): Promise<IGetEmployeeListResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/employee`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
  })  
  if (response.ok) {
    const json = await response.json()
    return { response: json.data.users }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

async function importEmployeesFromCSV(jwtToken: string, csvFile: File): Promise<IGetEmployeeListResponse> {
  const formData = new FormData()
  formData.append('file', csvFile)
  const response = await fetch(`${BASE_URL}/api/v1/employee/import/csv`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    },
  })
  if (response.ok) {
    const json = await response.json()
    return { response: json.data.employees }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

export { 
  requestEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee,
  requestEmployeeList, 
  importEmployeesFromCSV,
 }