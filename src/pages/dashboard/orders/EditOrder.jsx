import { Add, Close } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import DataTable from '../../../components/dashboard/DataTable'
import CDialog from '../../../common/dialog/CDialog';
import AddCustomItems from './AddCustomItems';
import CButton from '../../../common/CButton/CButton';

const items = [
  { product: "The lunch collective's Caesar salad", inStock: 434, itemPrice: '$200.00', qty: 2, itemTotal: '$400.00' },
  { product: "The Dinnar collective's Caesar salad", inStock: 322, itemPrice: '$150.00', qty: 5, itemTotal: '$600.00' },
];
const EditOrder = () => {
  const [cartItems, setCartItems] = useState(items);
  const [addCustomItemDialogOpen, setAddCustomItemDialogOpen] = useState(false)

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const handleQtyChange = (index, newValue) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty = newValue;
    setCartItems(updatedItems);
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };
  // console.log(cartItems)

  return (
    <Box maxWidth='lg'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography sx={{ fontSize: { xs: '18px', lg: '24px' }, fontWeight: 600 }}>Edit Order</Typography>
        <Button onClick={() => setAddCustomItemDialogOpen(true)} startIcon={<Add />} variant='outlined' sx={{ justifySelf: 'flex-end', width: 'fit-content' }}>Add Custom Items</Button>
      </Stack>

      {/* add custom item dialog */}
      <CDialog maxWidth='md' openDialog={addCustomItemDialogOpen} closeDialog={() => setAddCustomItemDialogOpen(false)}>
        <AddCustomItems closeDialog={() => setAddCustomItemDialogOpen(false)} />
      </CDialog>

      <Box mt={6}>
        <table className="shopping-cart-table">
          <thead>
            <tr style={{ color: 'gray' }}>
              <th>Product</th>
              {!isMobile && <th>In Stock</th>}
              <th>Item Price</th>
              <th>Qty</th>
              <th>Item Total</th>
              {!isMobile && <th>Remove</th>}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <Typography sx={{ color: 'primary.main', fontSize: { xs: '14px', md: '16px' } }}>{item.product}</Typography>
                </td>
                {
                  !isMobile &&
                  <td>
                    <Typography sx={{ color: 'primary.main', fontWeight: 600 }}> {item.inStock}</Typography>
                  </td>
                }
                <td><Typography sx={{ fontSize: { xs: '14px', md: '16px', fontWeight: 600 } }}>{item.itemPrice}</Typography></td>
                <td >

                  <input
                    style={{
                      border: '1px solid lightgray',
                      width: !isMobile ? '100px' : '50px',
                      padding: '5px',
                      borderRadius: '5px'
                    }}
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleQtyChange(index, e.target.value)}
                  />
                </td>
                <td><Typography sx={{ fontSize: { xs: '14px', md: '16px', fontWeight: 600 } }}>{item.itemTotal}</Typography></td>
                {!isMobile && <td>
                  <IconButton onClick={() => handleRemoveItem(index)}>
                    <Close />
                  </IconButton>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Stack direction={{ xs: 'column', lg: 'row' }} mt={6} gap={3}>
        <Box sx={{
          flex: 2
        }}>
          <Typography variant='h6'>Edit Order</Typography>
          <TextField fullWidth sx={{ maxWidth: '650px', mt: 2 }} placeholder='Add a reason' rows={4} multiline />
          <Typography sx={{ fontSize: '14px', color: 'gray', mt: .5 }}>Only you and other staff can see this reson</Typography>
          <Typography sx={{ fontSize: '16px', fontWeight: 600, color: 'gray', mt: 3 }}>Send invoice a Staff</Typography>
        </Box>
        <Box sx={{
          flex: 1
        }}>
          <Stack direction='row' justifyContent='space-between'>
            <Stack sx={{ px: 2 }} gap={3}>
              <Typography>SubTotal</Typography>
              <Typography>Tax</Typography>
              <Typography>Discount</Typography>
              <Typography><b>Total</b></Typography>
              <Typography>Paid by Staff</Typography>
              <Typography>Amount to collect</Typography>
            </Stack>
            <Stack sx={{ px: 2, mb: 2 }} gap={3}>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>$ 1300.00</Typography>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>- $ 53.99</Typography>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>$ -$00.00</Typography>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>$ 1399.00</Typography>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>$ 1399.00</Typography>
              <Typography sx={{ textWrap: 'nowrap', alignSelf: 'flex-end', fontWeight: 600 }}>$ 00.00</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Stack direction='row' justifyContent='space-between'>
        <Box></Box>
        <CButton variant='contained' style={{ mt: 3 }}>Edit Order</CButton>
      </Stack>

    </Box>
  )
}

export default EditOrder