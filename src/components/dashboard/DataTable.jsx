/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const DataTable = ({
  headerColor = true,
  rows,
  columns,
  rowHeight,
  getRowHeight,
  checkboxSelection,
  isRowSelectable,
  onRowSelectionModelChange,
  columnVisibilityModel,
  emptyText = 'Empty'
}) => {
  return (
    <Box sx={{
      // minHeight: '650px',
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: headerColor ? 'primary.main' : '',
        color: headerColor ? '#fff' : ''
      },
    }}>
      <DataGrid
        sx={{ minHeight: '650px' }}
        rows={rows}
        columns={columns}
        autoHeight
        rowHeight={rowHeight}
        getRowHeight={getRowHeight}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        localeText={{
          noRowsLabel: emptyText,
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} Selected`
              : `${count.toLocaleString()} Selected`,
        }}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onRowSelectionModelChange}
        isRowSelectable={isRowSelectable}
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