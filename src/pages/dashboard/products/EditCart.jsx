/* eslint-disable react/prop-types */
import { Add, ArrowDropDownOutlined, CheckBox, CheckBoxOutlineBlank, Close, Remove } from '@mui/icons-material';
import { Autocomplete, Avatar, Box, Button, Checkbox, Collapse, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import CButton from '../../../common/CButton/CButton';
import { GET_COMPANY_STAFFS, GET_INGREDIENTS } from '../manageStaff/graphql/query';
import { ADD_TO_CART } from './graphql/mutation';
import { ADDED_CARTS_LIST } from './graphql/query';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const EditCart = ({ data, closeDialog }) => {
  const [tableOpen, setTableOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [orderedQuantity, setOrderedQuantity] = useState('');
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


  const [addToCartMutation, { loading }] = useMutation(ADD_TO_CART, {
    onCompleted: (res) => {
      toast.success('Lagt til i handlekurv')
      closeDialog()
    },
    refetchQueries: [ADDED_CARTS_LIST],
    onError: (err) => {
      toast.error(err.message)
    }
  });


  const columns = [
    {
      field: 'users',
      headerName: 'Brukere',
      width: 200,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack direction='row' gap={1} alignItems='center'>
            <Avatar src={params.row?.photoUrl ? row.photoUrl : ''} />
            <Box>
              <Typography sx={{ fontSize: '16px' }}>{row.firstName + row.lastName}</Typography>
              <Typography sx={{ fontSize: '12px' }}>@{row.username}</Typography>
            </Box>
          </Stack>
        );
      }
    },
    {
      field: 'role',
      headerName: 'Rolle',
      width: 150,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack sx={{ height: '100%' }} direction='row' gap={1} alignItems='center'>
            <Typography sx={{
              fontSize: '12px',
              bgcolor: row.role === 'company-manager' ? 'primary.main' : row.role === 'company-owner' ? 'purple' : 'gray.main',
              px: 1, borderRadius: '4px',
              color: row.role === 'company-manager' ? '#fff' : row.role === 'company-owner' ? '#fff' : 'inherit',
            }}>{params.row.role.replace('company-', '')}</Typography>
          </Stack>
        );
      }
    },
    {
      field: 'email',
      headerName: 'E-post',
      width: 250,
    },
  ];

  const rows = rowData?.map(item => ({
    id: item.node.id,
    firstName: item.node.firstName || '',
    lastName: item.node.lastName || '',
    username: item.node.username,
    role: item.node.role,
    email: item.node.email,
    phone: item.node.phone,
    photoUrl: item.node.photoUrl,
  })).sort((a, b) => {
    if (a.role === 'company-owner') return -1;
    if (b.role === 'company-owner') return 1;
    if (a.role === 'company-manager') return -1;
    if (b.role === 'company-manager') return 1;
    return 0;
  });

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
    if (newSelection.length > orderedQuantity) {
      setOrderedQuantity(newSelection.length);
    }
  };

  const toggleQuantity = (type) => {
    if (type === 'increase') {
      setOrderedQuantity(orderedQuantity + 1);
    } else if (type === 'decrease') {
      const minimumQuantity = Math.max(selectedRows.length, 1); // Ensure minimum quantity is at least 1
      if (orderedQuantity > minimumQuantity) {
        setOrderedQuantity(orderedQuantity - 1);
      }
    }
  };


  const handleAddToCart = () => {
    addToCartMutation({
      variables: {
        dates: {
          date: data.date,
          quantity: orderedQuantity,
          addedFor: selectedRows
        },
        ingredients: selectedAllergies.map(item => item.id),
        item: data.item.id
      }
    })
  }



  useEffect(() => {
    if (data) {
      const rows = data.addedFor.edges.map(item => {
        const user = item.node;
        return {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.username,
          phone: user?.phone,
          email: user?.email,
          photoUrl: user?.photoUrl,
          role: user?.role,
        };
      });
      setSelectedRows(rows.map(item => item.id));
      setOrderedQuantity(data.orderedQuantity);
      setSelectedAllergies(data.ingredients?.edges?.map(item => item.node))
    }
  }, [data]);

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between'>
        <Box />
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      <Stack direction={{ xs: 'row', md: 'row' }} mb={4} gap={2} alignItems='center'>
        <img style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '4px',
        }} src={data?.item.attachments?.edges.find(item => item.node.isCover)?.node.fileUrl ?? "/noImage.png"} alt="" />
        <Box>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{data?.item.name}</Typography>
          <Typography variant='body2'>Kategori: <b>{data?.item.category.name}</b></Typography>
          <Typography>Pris: <b>{data?.item.priceWithTax}</b> kr</Typography>
        </Box>
      </Stack>
      <Typography variant='body2' mb={.5}>Bestilt Mengde</Typography>
      <Stack direction='row' gap={2} alignItems='center' mb={2}>
        <Stack sx={{
          width: '150px',
          border: `1px solid lightgray`,
          borderRadius: '4px',
        }} direction='row' alignItems='center' justifyContent='space-between' >
          <IconButton sx={{ height: '35px' }} onClick={() => toggleQuantity('decrease')}><Remove fontSize='small' /></IconButton>
          <Typography>{orderedQuantity}</Typography>
          <IconButton sx={{ height: '35px' }} onClick={() => toggleQuantity('increase')}><Add fontSize='small' /></IconButton>
        </Stack>
        {/* //allergies */}
        <Autocomplete
          size='small'
          sx={{ flex: 1 }}
          multiple
          options={allAllergies}
          value={selectedAllergies}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) => setSelectedAllergies(value.map(iiem => iiem))}
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
            <TextField {...params} label="Velg allergier" />
          )}
        />
      </Stack>

      <Button
        onClick={() => setTableOpen(!tableOpen)}
        sx={{ height: '100%', whiteSpace: 'nowrap' }}
        variant='outlined'
        endIcon={<ArrowDropDownOutlined />}
      >
        {`Ansatte ( ${data?.addedFor?.edges?.length} )`}
      </Button>



      <Collapse in={tableOpen}>
        {
          !rows.length > 0
            ?
            <Typography>Loading..</Typography>
            :
            <DataGrid
              localeText={{
                noRowsLabel: 'Tom',
                footerRowSelected: (count) =>
                  count !== 1
                    ? `${count.toLocaleString()} Valgt`
                    : `${count.toLocaleString()} Valgt`,
              }}
              sx={{ my: 2 }}
              rows={rows}
              columns={columns}
              autoHeight
              disableColumnFilter
              disableColumnMenu
              disableColumnSorting
              checkboxSelection
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={handleSelectionChange}
            />
        }
      </Collapse>

      <Stack direction='row' justifyContent='space-between' >
        <Box />
        <Stack direction='row' gap={2} mt={2}>
          <Button onClick={closeDialog} variant='outlined'>Avbryt</Button>
          <CButton onClick={handleAddToCart} isLoading={loading} variant='contained'>Oppdater</CButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditCart;
