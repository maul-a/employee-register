import React, { useEffect, useState } from 'react';
import { IconButton, CircularProgress, Container, Link } from '@mui/material';
import { IUser, logOutUser, selectJwtToken } from '@app/features/app/appSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import DataTable from './UserTable'
import { LockOpen } from '@mui/icons-material';


export default function UserTable() {
  const jwtToken = useAppSelector(selectJwtToken)
  const [userList, setUserList] = useState<IUser[]>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch('http://localhost:1337/api/v1/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
    })
    .then(res => res.json())
    .then(res => setUserList(res.data.users))
  }, [])
  const logOut = () => {
    dispatch(logOutUser())
  }

  if (!userList) {
    return <CircularProgress />
  }
  
  return (
    <Container sx={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
      <IconButton onClick={logOut}><LockOpen /></IconButton>
      <DataTable list={userList} />
    </Container>
  );
}