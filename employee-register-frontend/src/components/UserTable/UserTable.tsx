import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Container } from '@mui/material';
import { IUser } from '@app/features/app/appSlice';
import countries from '@app/json/countries.json' 

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID'},
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.personalData.firstName || ''} ${params.row.personalData.lastName || ''}`,
  },
  { 
    field: 'role', 
    headerName: 'Role', 
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.personalData.role
   },
   { 
    field: 'address', 
    headerName: 'Address',
    width: 300, 
    valueGetter: (params: GridValueGetterParams) => {
      const  { address } = params.row.personalData
      return `${address.street || ''} ${address.streetNr} ${address.ZIP} ${address.place}`
    },
  },
  { 
    field: 'country', 
    headerName: 'Country', 
    valueGetter: (params: GridValueGetterParams) => {
      const  { address } = params.row.personalData
      const country = countries.find(currentCountry => currentCountry.code === address.country)?.name
      return country ?? address.country
    }
  },
];


interface IDataTable {
  list: IUser[]
}

export default function DataTable({
    list
}: IDataTable) {
  return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={list}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
  );
}