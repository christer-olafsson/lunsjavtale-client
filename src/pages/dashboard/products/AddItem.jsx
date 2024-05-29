/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Add, ArrowBackIos, ArrowDropDown, ArrowForwardIos, CheckBox, CheckBoxOutlineBlank, Close, ExpandMore, Remove } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Button, Checkbox, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material'
import { addMonths, format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { GET_COMPANY_STAFFS, GET_INGREDIENTS } from '../manageStaff/graphql/query';
import { useMutation, useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import { ADD_TO_CART } from './graphql/mutation';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { ADDED_PRODUCTS } from './graphql/query';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;


const AddItem = ({ closeDialog, data }) => {
  const [rowdata, setRowData] = useState([])
  const [selectedDates, setSelectedDates] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null)
  const [cartItems, setCartItems] = useState({});
  const [rowSelections, setRowSelections] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allAllergies, setAllAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useQuery(GET_COMPANY_STAFFS, {
    onCompleted: (res) => {
      const data = res.companyStaffs.edges.filter(({ node }) => !node.isDeleted);
      setRowData(data);
    },
  });

  //get all allergies
  useQuery(GET_INGREDIENTS, {
    onCompleted: (res) => {
      const data = res.ingredients.edges.map(item => item.node)
      setAllAllergies(data)
    }
  });

  // add to cart mutation
  const [addToCartMutation, { loading }] = useMutation(ADD_TO_CART, {
    onCompleted: (res) => {
      toast.success('Added To Cart')
      closeDialog()
    },
    refetchQueries: [ADDED_PRODUCTS],
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const handleAddToCart = () => {
    if (selectedDates.length === 0) {
      toast.error("No Date Selected!")
      return
    }
    if (!formattedData.some(item => item.quantity > 0)) {
      toast.error("No Quantity Selected!")
      return
    }
    if (!formattedData.every(item => item.quantity > 0)) {
      toast.error("Empty Quantity Selected!")
      return
    }
    addToCartMutation({
      variables: {
        dates: formattedData,
        ingredients: selectedAllergies,
        item: data.id
      }
    })
  }



  //calculet total price
  useEffect(() => {
    const total = selectedDates.reduce((acc, date) => {
      return acc + (cartItems[date]?.totalPrice || 0);
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [selectedDates, cartItems]);


  // date selection 
  const onChangeDate = (dates) => {
    const selectedDateList = dates.map((date) => format(date, 'yyyy-MM-dd'));
    setSelectedDates(selectedDateList);
  };

  const dateDeselect = (date) => {
    setSelectedDates(selectedDates.filter(prev => prev !== date))
  }

  const theme = useTheme();

  const columns = [
    // {
    //   field: 'id', headerName: 'ID', width: 50
    // },
    {
      field: 'users',
      headerName: 'Users',
      width: 200,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
            <Box>
              <Typography sx={{ fontSize: '16px' }}>{row.firstName + row.lastName}</Typography>
              <Typography sx={{ fontSize: '12px' }}>@{row.username}</Typography>
            </Box>
          </Stack>
        )
      }
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => {
        const { row } = params
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
            <Typography sx={{
              fontSize: '12px',
              bgcolor: row.role === 'manager' ? 'primary.main' : row.role === 'owner' ? 'purple' : 'gray.main',
              px: 1, borderRadius: '4px',
              color: row.role === 'manager' ? '#fff' : row.role === 'owner' ? '#fff' : 'inherit',
            }}>{params.row.role}</Typography>
          </Stack>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
  ];


  // quantity handler
  const toggleQuantity = (date, action) => {
    setCartItems((prev) => {
      const currentQuantity = prev[date]?.quantity || 0;
      const selectedRowsLength = rowSelections[date]?.length || 0;
      let newQuantity = currentQuantity;

      if (action === 'increase') {
        newQuantity = currentQuantity + 1;
      } else if (action === 'decrease' && currentQuantity > selectedRowsLength) {
        newQuantity = currentQuantity - 1;
      }

      const newTotalPrice = newQuantity * data.priceWithTax;

      return {
        ...prev,
        [date]: {
          ...prev[date],
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        },
      };
    });
  };

  const handleSelectionChange = (date, newSelection) => {
    setRowSelections((prev) => {
      const selectedRowsLength = newSelection.length;

      setCartItems((prevCartItems) => {
        const newQuantity = Math.max(prevCartItems[date]?.quantity || 0, selectedRowsLength);
        const newTotalPrice = newQuantity * data.priceWithTax;

        return {
          ...prevCartItems,
          [date]: {
            ...prevCartItems[date],
            quantity: newQuantity,
            totalPrice: newTotalPrice,
          },
        };
      });

      return {
        ...prev,
        [date]: newSelection,
      };
    });
  };

  const handleClickNext = () => {
    if (selectedDates.length === 0) {
      toast.error("No Date Selected!")
      return
    }
    setNextPage(true)
  }


  const rows = rowdata?.map(item => ({
    id: item.node.id,
    firstName: item.node.firstName || '',
    lastName: item.node.lastName || '',
    username: item.node.username,
    role: item.node.role,
    email: item.node.email,
    jobTitle: item.node.jobTitle,
    phone: item.node.phone,
    photoUrl: item.node.photoUrl,
    fileId: item.node.fileId,
    join: format(new Date(item.node.dateJoined), 'MMMM dd, yyyy'),
    allergies: item.node.allergies
  })).sort((a, b) => {
    if (a.role === 'owner') return -1;
    if (b.role === 'owner') return 1;
    if (a.role === 'manager') return -1;
    if (b.role === 'manager') return 1;
    return 0;
  });

  useEffect(() => {
    const data = selectedDates.map((date) => ({
      date,
      quantity: cartItems[date]?.quantity || 0,
      addedFor: rowSelections[date] || [],
      // totalPrice: cartItems[date]?.totalPrice || 0,
    }));
    setFormattedData(data);
  }, [selectedDates, cartItems, rowSelections]);


  return (
    <Box sx={{
      // p: { xs: 0, md: 2 }
      // minHeight: '100vh'
    }}>
      {
        !nextPage ?
          // date selection
          (
            <Box>
              <Stack direction='row' justifyContent='space-between' mb={4}>
                <Typography variant='h4'>Add Item</Typography>
                <IconButton onClick={closeDialog}>
                  <Close />
                </IconButton>
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems='center'>
                <Box sx={{
                  width: '96px',
                  height: '96px',
                  mb: 2
                }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                    src={data?.attachments.edges.find(item => item.node.isCover)?.node.fileUrl || '/noImage.png'} alt="" />
                </Box>
                <Box sx={{ flex: 1, mb: 2 }}>
                  <Typography variant='h6'>{data?.name}</Typography>
                  <Typography sx={{ fontSize: '14px', mb: 1 }}>{data?.description}</Typography>
                  <Typography sx={{ fontSize: '14px' }}> <i>NOK:</i> {data?.priceWithTax}</Typography>
                </Box>
              </Stack>

              <Box sx={{ mb: 2 }}>
                <ReactDatePicker
                  withPortal
                  placeholderText="Click to select date"
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 1)}
                  selectedDates={selectedDates}
                  selectsMultiple
                  onChange={onChangeDate}
                  shouldCloseOnSelect={false}
                  disabledKeyboardNavigation
                />
              </Box>

              <Box mb={2}>
                <table className='shopping-cart-table'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      selectedDates.map(date => (
                        <tr key={date}>
                          <td style={{ whiteSpace: 'nowrap' }}>{date}</td>
                          <td>
                            <Stack sx={{
                              width: '150px',
                              border: `1px solid ${theme.palette.primary.main}`,
                              borderRadius: '50px',
                            }} direction='row' alignItems='center' justifyContent='space-between' >
                              <IconButton onClick={() => toggleQuantity(date, 'decrease')}><Remove /></IconButton>
                              <Typography>{cartItems[date]?.quantity || 0}</Typography>
                              <IconButton onClick={() => toggleQuantity(date, 'increase')}><Add /></IconButton>
                            </Stack>
                          </td>
                          <td style={{ width: '200px' }}> <i>NOK:</i> {cartItems[date]?.totalPrice.toFixed(2) || 0}</td>
                          <td style={{ width: '50px' }}>
                            <IconButton onClick={() => dateDeselect(date)}>
                              <Close />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td></td>
                      <td><b>Total:</b></td>
                      <td>
                        <b><i>NOK:</i>{totalPrice}</b>
                        {/* <b><i>NOK:</i>{calculateTotalPrice()}</b> */}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Autocomplete
                multiple
                options={allAllergies}
                disableCloseOnSelect
                onChange={(event, value) => setSelectedAllergies(value.map(i => i.id))}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Select Allergies" />
                )}
              />
              <Button onClick={handleClickNext} variant='contained'
                sx={{ width: '100%', height: '56px', fontSize: { xs: '15px', md: '18px' }, mt: 2 }}>Next</Button>
            </Box>
          )
          :
          // staff add selection
          (
            <Box>
              <Stack direction='row' gap={2} mb={4} alignItems='center'>
                <IconButton sx={{ width: '50px', height: '50px' }} onClick={() => setNextPage(false)}>
                  <ArrowBackIos />
                </IconButton>
                <Box>
                  <Typography variant='h4'>Select Staffs</Typography>
                  <Typography variant='body'>Click Arrow button to Select Staffs</Typography>
                </Box>
              </Stack>

              <Box>
                <Stack sx={{ bgcolor: 'light.main', borderRadius: '8px', py: 2, px: 4, mb: 2 }} direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Date</Typography>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Number Of Quantity</Typography>
                  <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Price</Typography>
                </Stack>

                <Stack gap={2}>
                  {selectedDates.map((date, idx) => (
                    <Box sx={{
                      borderRadius: '8px',
                      border: `2px solid ${selectedListId === idx ? theme.palette.primary.main : 'lightgray'}`,
                      // border: '1px solid lightgray',
                      height: '100%',
                      transition: 'height 2s'
                    }} key={date}>
                      <Stack
                        sx={{
                          p: 2,
                        }}
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Stack direction='row' gap={2} alignItems='center'>
                          <IconButton onClick={() => {
                            if (selectedListId === idx) {
                              setSelectedListId(null)
                            } else {
                              setSelectedListId(idx)
                            }
                          }}>
                            <ArrowForwardIos sx={{
                              transform: 'rotate(90deg)'
                            }} />
                          </IconButton>
                          <Typography>{date}</Typography>
                        </Stack>
                        <Stack
                          sx={{
                            width: '150px',
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '50px',
                            mr: 10
                          }}
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <IconButton onClick={() => toggleQuantity(date, 'decrease')}>
                            <Remove />
                          </IconButton>
                          <Typography>{cartItems[date]?.quantity || 0}</Typography>
                          <IconButton onClick={() => toggleQuantity(date, 'increase')}>
                            <Add />
                          </IconButton>
                        </Stack>
                        <Typography sx={{ width: '100px' }}> <i>NOK:</i> {cartItems[date]?.totalPrice || 0}</Typography>
                        <IconButton onClick={() => dateDeselect(date)}>
                          <Close />
                        </IconButton>
                      </Stack>
                      <Collapse in={selectedListId === idx}>
                        {
                          selectedListId === idx &&
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 10,
                                },
                              },
                            }}
                            pageSizeOptions={[10]}
                            autoHeight
                            disableColumnFilter
                            disableColumnMenu
                            disableColumnSorting
                            checkboxSelection
                            rowSelectionModel={rowSelections[date] || []}
                            onRowSelectionModelChange={(newSelection) => handleSelectionChange(date, newSelection)}
                          />
                        }
                      </Collapse>
                    </Box>
                  ))}
                  {/* <Box>
                    <Typography>Data Output:</Typography>
                    <pre>{JSON.stringify(formattedData, null, 2)}</pre>
                  </Box> */}
                </Stack>

                <Stack direction='row' justifyContent='space-between' mt={1} mr={2}>
                  <Box />
                  <Typography sx={{ fontWeight: 600 }}>Total NOK: {totalPrice}</Typography>
                  {/* <Typography sx={{ fontWeight: 600 }}>Total NOK: {calculateTotalPrice()}</Typography> */}
                </Stack>

              </Box>

              <CButton onClick={handleAddToCart} isLoading={loading} variant='contained' style={{ width: '100%', height: '56px', fontSize: { xs: '15px', md: '18px' }, mt: 2 }}>Add To Cart</CButton>
            </Box>
          )
      }
    </Box>
  )
}

export default AddItem