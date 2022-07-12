import { IEmployee } from "./employeesSlice"

interface IGetEmployeeListResponse {
  response?: IEmployee[]
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

async function deleteEmployee(jwtToken: string, userId: string): Promise<IDeleteEmployeeResponse> {
  const response = await fetch(`http://localhost:1337/api/v1/employee/${userId}`, {
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

async function createEmployee(jwtToken: string, employee: Omit<IEmployee, 'id'>): Promise<ICreateEmployeeResponse> {
  const response = await fetch('http://localhost:1337/api/v1/employee', {
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

async function requestEmployeeList(jwtToken: string): Promise<IGetEmployeeListResponse> {
  const response = await fetch('http://localhost:1337/api/v1/employee', {
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
  const response = await fetch('http://localhost:1337/api/v1/employee/import/csv', {
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
  createEmployee, 
  deleteEmployee,
  requestEmployeeList, 
  importEmployeesFromCSV,
 }