import * as React from 'react'
import { CssBaseline, Box, Container, CircularProgress } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from "react-router-dom"
import { selectJwtToken } from '@app/features/auth/authSlice';
import { requestEmployee } from '@app/features/employees/employeesRequests';
import { IEmployee } from '@app/features/employees/employeesSlice';
import { addToCommentList, selectCommentsLoadingStatus, setCommentList, setInitialValue } from '@app/features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { createNewComment, requestCommentList } from '@app/features/comments/commentsRequests';
import CommentList from './comment-list';
import AddNewComment from './add-new-comment';

export default function EmployeeFullView() {
  const dispatch = useAppDispatch()

  const jwtToken = useAppSelector(selectJwtToken)
  const loading = useAppSelector(selectCommentsLoadingStatus)
  const { id } = useParams()
  const [employee, setEmployee] = React.useState<(IEmployee & {hasAuthData: boolean})|null>(null)
  React.useEffect(() => {
    if (!id) {
      return
    }
    requestCommentList(jwtToken!, id)
    .then(({ response }) => {
      if (response) {
        dispatch(setCommentList(response))
      }
    })

    requestEmployee(id)
      .then(({ response }) => {
        if (response) {
          return setEmployee(response)
        }
      })

    return () => {
      dispatch(setInitialValue())
    }
  }, [])

  const handleCreateComment = React.useCallback(async (text: string) => {
    const { response } = await createNewComment(jwtToken!, text, id!)
    if (response) {
      dispatch(addToCommentList(response))
    }
  }, [id])
  if (!employee || !id || loading) {
    return <CircularProgress />
  }
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          Name: {employee.firstName} {employee.lastName}
        </Box>
        <Box>
          Role: {employee.role}
        </Box>
        <Box>
          Address: {employee.address.street || ''} {employee.address.street || ''} {employee.address.ZIP || ''} {employee.address.place || ''}
        </Box>
        {employee.hasAuthData && (
          <Box>
            Registered <CheckIcon />
          </Box>)}
      </Box>
      <CommentList />
      <AddNewComment handleCreateComment={handleCreateComment} />
    </Container>
  )
} 