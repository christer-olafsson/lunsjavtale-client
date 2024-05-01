/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Add, Close, Remove } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CButton from '../../common/CButton/CButton';
import { useSelector } from 'react-redux';
import SelectDate from '../../pages/dashboard/myside/SelectDate';

const allergies = [
  'Gluten (oats, wheat, rye, spelt, barley)',
  'Peanuts',
  'Milks',
  'Fishs',
  'Shellfish',
  'Egg',
];

const AddItem = ({ closeDialog, option, data }) => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [quantities, setQuantitys] = useState(1);
  const [cartItems, setCartItems] = useState({});

console.log(data)
  const selectedDate = useSelector((state) => state.selectedDate.date)

  const theme = useTheme();
  console.log(cartItems)
  const toggleQuantity = (date, action) => {
    setCartItems(prevItems => {
      const item = prevItems[date] || { productId: 12, quantity: 0, totalPrice: 0 };
      let newQuantity = item.quantity;
      if (action === 'increase') {
        newQuantity = item.quantity + 1;
      } else if (action === 'decrease' && item.quantity > 0) {
        newQuantity = item.quantity - 1;
      }
      const totalPrice = calculatePrice(newQuantity);
      return { ...prevItems, [date]: { ...item, quantity: newQuantity, totalPrice } };
    });
  };

  // const toggleQuantity = (date, action) => {
  //   setQuantitys(prevQuantities => {
  //     const currentQuantity = prevQuantities[date] || 0;
  //     let newQuantity = currentQuantity;
  //     if (action === 'increase') {
  //       newQuantity = currentQuantity + 1;
  //     } else if (action === 'decrease' && currentQuantity > 0) {
  //       newQuantity = currentQuantity - 1;
  //     }
  //     return { ...prevQuantities, [date]: newQuantity };
  //   });
  // };

  // const calculatePrice = (date, quantity) => {
  //   const price = data.node.price; 
  //   return price * quantity;
  // };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    Object.values(cartItems).forEach(item => {
      totalPrice += item.totalPrice;
    });
    return totalPrice;
  };
  const calculatePrice = (quantity) => {
    const price = data?.node?.price
    const parsedQuantity = parseInt(quantity, 10);
    if (!isNaN(parsedQuantity)) {
      return price * parsedQuantity;
    } else {
      return 0; // Return 0 if quantity is not a valid number
    }
  };

  const toggleAllergy = (allergy) => {
    const isSelected = selectedAllergies.includes(allergy);
    if (isSelected) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  return (
    <Box sx={{
      p: { xs: 0, md: 2 }
    }}>
      {
        selectedDate.length === 0 ?
          <Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography sx={{ fontSize: { xs: '16px', lg: '22px' }, fontWeight: 600 }}>No Date Selected!</Typography>
              <IconButton onClick={closeDialog}>
                <Close />
              </IconButton>
            </Stack>
          </Box>
          :
          <>
            <Stack direction='row' justifyContent='space-between' mb={4}>
              <Typography variant='h4'>Add</Typography>
              <IconButton onClick={closeDialog}>
                <Close />
              </IconButton>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
              <Box sx={{
                // width:'96px',
                // height:'96px'
              }}>
                <img style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '12px' }} src={data?.node?.attachments?.edges[0].node?.fileUrl} alt="" />
              </Box>
              <Box mb={2}>
                <Typography variant='h6'>{data?.node?.name}</Typography>
                <Typography sx={{ fontSize: '14px', mb: 2 }}>{data?.node?.description}</Typography>
                {/* <Typography variant='h6'>Allergens</Typography>
                <Typography sx={{ fontSize: '14px' }}>Egg, Milk, Mustard, Sulphite</Typography> */}
              </Box>
            </Stack>

            <Box>
              <table className='shopping-cart-table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    selectedDate.map(date => (
                      <tr key={date}>
                        <td>{date}</td>
                        <td>
                          <Stack sx={{
                            width: '120px',
                            border: `1px solid ${theme.palette.primary.main}`,
                            borderRadius: '50px'
                          }} direction='row' alignItems='center' justifyContent='space-between' >
                            <IconButton onClick={() => toggleQuantity(date, 'decrease')}><Remove /></IconButton>
                            <Typography>{cartItems[date]?.quantity || 0}</Typography>
                            <IconButton onClick={() => toggleQuantity(date, 'increase')}><Add /></IconButton>
                          </Stack>
                        </td>
                        <td>${cartItems[date]?.totalPrice || 0}</td>
                      </tr>
                    ))
                  }
                  <tr>
                    <td></td>
                    <td><b>Total:</b></td>
                    <td>
                      <b>${calculateTotalPrice()}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>


            <Box mt={2}>
              <Typography variant='h6' mb={1}>Allergies</Typography>
              {
                !option && (
                  <Stack direction='row' flexWrap='wrap'>
                    {allergies.map((allergy, index) => (
                      <Box
                        key={index}
                        onClick={() => toggleAllergy(allergy)}
                        sx={{
                          padding: { xs: '3px 5px', md: '6px 10px' },
                          margin: '5px',
                          cursor: 'pointer',
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: '4px',
                          color: selectedAllergies.includes(allergy) ? '#fff' : 'inherit',
                          bgcolor: selectedAllergies.includes(allergy) ? 'primary.main' : 'transparent',
                          userSelect: 'none'
                        }}
                      >
                        <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>{allergy}</Typography>
                      </Box>
                    ))}
                  </Stack>
                )
              }
              {
                option &&
                <Box sx={{
                  padding: { xs: '5px 10px', md: '12px 24px' },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '8px', mt: 2,
                  textAlign: 'center',
                  bgcolor: 'light.main '
                }}>
                  <Typography>Unfortunately, this menu cannot be adjusted for allergies</Typography>
                </Box>

              }
            </Box>
            {
              !option && (
                <Box sx={{
                  padding: { xs: '5px 10px', md: '12px 24px' },
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '8px', mt: 2,
                  textAlign: 'center'
                }}>
                  <Typography>Nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios, brazil nuts and
                    macadamia nuts)</Typography>
                </Box>
              )
            }

            <Button variant='contained' sx={{ width: '100%', mt: 2 }}>Use</Button>
          </>
      }

    </Box>
  )
}

export default AddItem