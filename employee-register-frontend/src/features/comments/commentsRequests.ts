import { IEmployee } from "../employees/employeesSlice"
import { IComment } from "./commentsSlice"

const BASE_URL = process.env['NODE_ENV'] === 'production' ? '' : 'http://localhost:1337'

interface IRequestCommentListResponse {
  error?: string
  response?: IComment[]
}

interface ICreateCommentResponse {
  error?: string
  response?: IComment
}


interface ICommentBackend {
  author: IEmployee
  id: string
  text: string
  date: string
}

async function requestCommentList(jwtToken: string, userId: string): Promise<IRequestCommentListResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/comment?userId=${userId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
  })  
  if (response.ok) {
    const json = await response.json()
    const comments = json.data.comments as ICommentBackend[]
    return { 
      response: comments.map(comment => ({
        ...comment,
        date: new Date(comment.date),
      })) 
    }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}


async function createNewComment(jwtToken: string, text: string, userId: string): Promise<ICreateCommentResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/comment`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({
      text,
      userId,
    })
  })  
  if (response.ok) {
    const json = await response.json()
    const comment = json.data.comment as ICommentBackend
    return { 
      response: {
        ...comment,
        date: new Date(comment.date),
      }
    }
  } else {
    const json = await response.json()
    return { error: json['status_message'] }    
  }
}

export { 
  requestCommentList,
  createNewComment,
}