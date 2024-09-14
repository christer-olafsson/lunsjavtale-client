/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material'
import { Autocomplete, Avatar, Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CREATE_PAYMENT } from './graphql/mutation';
import CButton from '../../../common/CButton/CButton';
import { Link } from 'react-router-dom';
import { ME } from '../../../graphql/query';
import { MAKE_ONLINE_PAYMENT } from '../payment/graphql/mutation';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const CreatePayment = ({ isStaffs, isCompany, orderData, closeDialog }) => {
  const [users, setUsers] = useState([])
  const [selectedStaffsOrder, setSelectedStaffsOrder] = useState([])
  const [currentStaffOrder, setCurrentStaffOrder] = useState({})

  const { data: user } = useQuery(ME)

  const [createPayment, { loading }] = useMutation(MAKE_ONLINE_PAYMENT, {
    onCompleted: (res) => {
      console.log(res)
      if (res.makeOnlinePayment.paymentUrl) {
        window.location.href = res.makeOnlinePayment.paymentUrl
      }
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });


  // const handleSave = () => {
  //   createPayment({
  //     variables: {
  //       input: {
  //         paymentFor: isStaff ? user?.me?.id : '',
  //         company: user?.me?.company?.id,
  //         paidAmount: isStaff ? user?.me?.dueAmount : user?.me?.company?.balance,
  //       }
  //     }
  //   })
  // }


  const totalPayment = selectedStaffsOrder.reduce((total, user) => total + parseFloat(user.dueAmount), 0).toFixed(2)

  const handlePay = () => {
    if (isStaffs) {
      if ((user?.me.role !== 'company-employee') && (selectedStaffsOrder.length === 0)) {
        toast.error('No Staffs Selected')
        return
      }
      createPayment({
        variables: {
          input: {
            company: orderData?.company.id ?? '',
            paidAmount: user?.me.role === 'company-employee' ? parseInt(currentStaffOrder?.dueAmount) : parseInt(totalPayment),
            userCarts: user?.me.role === 'company-employee' ? [currentStaffOrder?.id] : selectedStaffsOrder.map(user => user.id) ?? '',
            paymentFor: user?.me.role === 'company-employee' ? currentStaffOrder?.addedFor?.id : null
          }
        }
      })
    }
    if (isCompany) {
      createPayment({
        variables: {
          input: {
            orders: [orderData?.id] ?? null,
            company: orderData?.company.id ?? '',
            paidAmount: parseInt(orderData.companyDueAmount),
          }
        }
      })
    }
  }

  useEffect(() => {
    if (orderData) {
      const userCarts = orderData?.orderCarts?.edges?.map(item => item.node?.users?.edges || []) || [];
      const selectedUsers = userCarts.flat().map(user => user?.node);
      setUsers(selectedUsers)
      const isCurrentStaff = selectedUsers?.find(data => data?.addedFor?.id === user?.me?.id);
      setCurrentStaffOrder(isCurrentStaff)
    }
  }, [orderData])

  return (
    <Box>

      <Stack direction='row' justifyContent='space-between' mb={1}>
        <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
          Create payment for order
          <span style={{ color: 'coral' }}> #{orderData?.id}</span>
        </Typography>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Stack>
      {
        user?.me.role === 'company-employee' &&
        <Typography>Total Pay: <b>{currentStaffOrder?.dueAmount}</b> kr </Typography>
      }
      {
        (user?.me.role !== 'company-employee' && !isCompany) &&
        <Box>
          <Typography>Selected Staffs: <b>{selectedStaffsOrder.length}</b> </Typography>
          <Typography mb={3}>
            Total Payment: <b>{totalPayment}</b> kr
          </Typography>
        </Box>
      }
      {
        isCompany && <Typography>Total Company Due for Pay <b style={{ color: 'coral' }}>{orderData?.companyDueAmount}</b>  kr</Typography>
      }
      {/* user select */}
      <Autocomplete
        sx={{
          mb: 2,
          display: user?.me.role === 'company-employee' ? 'none' : isCompany ? 'none' : 'block'
        }}
        options={users}
        multiple
        // disabled={!payload.company?.id}
        disableCloseOnSelect
        onChange={(_, value) => setSelectedStaffsOrder(value)}
        getOptionLabel={(option) => option?.addedFor?.username}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <Stack direction='row' gap={1}>
                <Avatar src={option.addedFor.photoUrl ?? ''} />
                <Box>
                  <Stack >
                    <Typography sx={{ fontSize: '14px' }}> <b></b> {option?.addedFor?.email}</Typography>
                    <Typography sx={{
                      // border: '1px solid lightgray',
                      lineHeight: '12px',
                      width: 'fit-content',
                      px: 1, borderRadius: '4px',
                      fontSize: '10px'
                    }}>{option.addedFor.role.replace('company-', '')}</Typography>
                  </Stack>
                  <Stack direction='row' gap={3}>
                    <Link to={`/dashboard/staff-details/${option.addedFor.id}`} style={{ fontSize: '14px' }}>
                      <b>@</b>{option?.addedFor?.username}
                    </Link>
                    <Typography sx={{ fontSize: '14px' }}> <b>Due: </b> {option?.dueAmount} kr</Typography>
                  </Stack>
                </Box>
              </Stack>
            </li>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Payment for (User)" />
        )}
      />

      <CButton isLoading={loading} onClick={handlePay} variant='contained' style={{ width: '100%', mt: 2 }}>
        Confirm
      </CButton>

    </Box>
  )
}

export default CreatePayment