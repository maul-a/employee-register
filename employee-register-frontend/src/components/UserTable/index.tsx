import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, CircularProgress, Container, Link, Button } from '@mui/material';
import { IUser, logOutUser, selectJwtToken } from '@app/features/app/appSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import DataTable from './UserTable'
import { LockOpen } from '@mui/icons-material';


const Input = styled('input')({
  display: 'none',
});


export default function UserTable() {
  const jwtToken = useAppSelector(selectJwtToken)
  const [userList, setUserList] = useState<IUser[]>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetch('http://localhost:1337/api/v1/employee', {
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
      <label htmlFor="contained-button-file">
        <Input 
          accept="text/csv" 
          id="contained-button-file" 
          multiple 
          type="file" 
          onChange={async (e) => {
            const file = e.target?.files ? e.target?.files[0] : null
            if (file) {
              const formData = new FormData()
              formData.append('file', file)
              const data = await fetch('http://localhost:1337/api/v1/employee/import/csv', {
                method: 'POST',
                body: formData,
              }).then(data => data.json())
              // setUserList((prevUserList) => ([...(prevUserList || []), ]))
            }
          }}
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </Container>
  );
}