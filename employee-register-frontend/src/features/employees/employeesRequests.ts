import { IEmployee } from "./employeesSlice"

interface IGetEmployeeListResponse {
  response?: IEmployee[]
  error?: string
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

export { requestEmployeeList, importEmployeesFromCSV }