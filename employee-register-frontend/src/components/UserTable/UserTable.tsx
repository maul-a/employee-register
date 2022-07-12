import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ButtonGroup, IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import countries from '@app/json/countries.json' 
import { IEmployee } from '@app/features/employees/employeesSlice';
import { Link } from 'react-router-dom';





interface IDataTable {
  list: (IEmployee & {id: string})[]
  setEmployeeToDelete: (employeeId: string) => void,
}

export default function DataTable({
    list,
    setEmployeeToDelete,
}: IDataTable) {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">Full Name</TableCell>
          <TableCell align="right">Role</TableCell>
          <TableCell align="right">Address</TableCell>
          <TableCell align="right">Country</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((row) => {
          const country = countries.find(currentCountry => currentCountry.code === row.address.country)?.name
          const countryName = country ?? row.address.country
          
          return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">
                {row.address.street || ''} {row.address.streetNr || ''} {row.address.ZIP || ''} {row.address.place || ''}
              </TableCell>
              <TableCell align="right">{countryName}</TableCell>
              <TableCell align="right">
                <ButtonGroup>
                <IconButton component={Link} to={`/edit-employee/${row.id}`}> <EditIcon /> </IconButton>
                <IconButton onClick={() => setEmployeeToDelete(row.id)}> <DeleteIcon /> </IconButton>
              </ButtonGroup>
              </TableCell>
            </TableRow>
        )})}
      </TableBody>
    </Table>
  </TableContainer>
  )
}