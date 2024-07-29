/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const DataTable = ({ rows, columns, rowHeight, getRowHeight, checkboxSelection, onRowSelectionModelChange, columnVisibilityModel }) => {
  return (
    <Box  sx={{
      minHeight: '650px',
      width: '100%',
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        // rowHeight={rowHeight}
        getRowHeight={getRowHeight}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onRowSelectionModelChange}
        columnVisibilityModel={columnVisibilityModel}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSorting
        disableColumnMenu
      />
    </Box>
  )
}

export default DataTable