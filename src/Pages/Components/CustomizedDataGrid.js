import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// Placeholder functions for edit and delete action

export default function CustomizedDataGrid({rows , columns}) {
  return (
    <DataGrid
    autoHeight
    // hideFooterPagination={true}
    rows={rows}
    columns={columns}
    getRowClassName={(params) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
    }
    getRowHeight={() => 'auto'}
    disableColumnResize
    density="compact"
    slotProps={{
      filterPanel: {
        filterFormProps: {
          logicOperatorInputProps: {
            variant: 'outlined',
            size: 'small',
          },
          columnInputProps: {
            variant: 'outlined',
            size: 'small',
            sx: { mt: 'auto' },
          },
          operatorInputProps: {
            variant: 'outlined',
            size: 'small',
            sx: { mt: 'auto' },
          },
          valueInputProps: {
            InputComponentProps: {
              variant: 'outlined',
              size: 'small',
            },
          },
        },
      },
    }}
  />
  
  );
}
