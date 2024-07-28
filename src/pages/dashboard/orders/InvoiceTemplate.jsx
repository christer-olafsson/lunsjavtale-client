/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { CloseOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import { format } from 'date-fns';
import { CLIENT_DETAILS, ME } from '../../../graphql/query';

export const downloadPDF = () => {
  const invoiceBtn = document.getElementById('invoice-btn');
  const input = document.getElementById('invoice');

  // Hide the download button
  // invoiceBtn.style.visibility = 'hidden';

  html2canvas(input, { scale: 3, useCORS: true }) // useCORS: true for show remote image
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.7); // Lower the quality to reduce size
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, '', 'FAST'); // Add 'FAST' for additional compression
      pdf.save('invoice.pdf');

      // Show the download button again
      // invoiceBtn.style.visibility = 'visible';
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
      // Show the download button again in case of an error
      // invoiceBtn.style.visibility = 'visible';
    });
};



const InvoiceTemplate = ({ data, toggleDrawer }) => {
  const [clientDetails, setClientDetails] = useState({})

  const { data: user } = useQuery(ME)

  useQuery(CLIENT_DETAILS, {
    onCompleted: (res) => {
      setClientDetails(res.clientDetails)
    },
  });

  return (
    <Box sx={{
      position: 'absolute',
      transform: 'translateY(-200%)',
      width: '1100px',
      // minHeight: '1300px',
      py: 4, px: 10,
      color: 'black',
      // border: '1px solid lightgray'
    }} id="invoice" >

      {/* <Stack id='invoice-btn' direction='row' gap={2} alignItems='center'>
        <IconButton onClick={toggleDrawer}>
          <CloseOutlined />
        </IconButton>
        <Button onClick={downloadPDF} sx={{ borderRadius: '50px', height: '32px' }} variant='outlined' startIcon={<FileDownloadOutlined />}>Save</Button>
      </Stack> */}

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' gap={4}>
          <img style={{ width: '200px' }} src="/Logo.svg" alt="" />
          <Stack>
            <Typography variant='h5' fontWeight={600} mb={2}>{clientDetails?.name}</Typography>
            <Typography variant='body'>{clientDetails?.address}</Typography>
            <Typography variant='body'>{clientDetails?.contact}</Typography>
            <Typography variant='body'>{clientDetails?.email}</Typography>
          </Stack>
        </Stack>
        <Box>
          <Stack direction='row'>
            <Typography sx={{ width: '130px' }}> <b>Company:</b></Typography>
            <Typography>{user?.me?.company?.name}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '130px' }}> <b>Email:</b></Typography>
            <Typography>{user?.me?.company?.email}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '130px' }}> <b>Post Code:</b></Typography>
            <Typography>{user?.me?.company?.postCode}</Typography>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mb: .5, mt: 6 }} />
      <Divider sx={{ mb: 6 }} />

      <Stack direction='row' justifyContent='space-between'>
        <Stack>
          <Typography sx={{ fontWeight: 600, mb: 2 }}>Shipping Address</Typography>
          <Typography>{data?.shippingAddress?.fullName}</Typography>
          <Typography>{data?.shippingAddress?.address}</Typography>
          <Typography>{data?.shippingAddress?.city}, {data?.shippingAddress?.postCode}</Typography>
        </Stack>
        <Stack >
          <Typography sx={{ fontWeight: 600, mb: 2 }}>Billing Address</Typography>
          <Typography>{data?.billingAddress?.firstName + " " + data?.billingAddress?.lastName ?? ''}</Typography>
          <Typography>{data?.billingAddress?.address}</Typography>
        </Stack>
        <Stack alignItems='center' sx={{
          display: 'inline-flex',
          height: '30px',
          width: 'fit-content',
          px: 4,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: data.status === 'Cancelled'
            ? 'red'
            : data.status === 'Confirmed'
              ? 'lightgreen'
              : data.status === 'Delivered'
                ? 'green'
                : data.status === 'Processing'
                  ? '#8294C4'
                  : data.status === 'Ready-to-deliver'
                    ? '#01B8A9'
                    : 'yellow',
          color: data?.status === 'Placed'
            ? 'dark' : data?.status === 'Payment-pending'
              ? 'dark' : data?.status === 'Confirmed' ? 'dark' : '#fff',
          borderRadius: '50px',
        }}>
          <Typography sx={{ fontWeight: 600 }} variant='body2'>{data?.status}</Typography>
        </Stack>
      </Stack>

      <Box mb={10} mt={8}>
        <Typography sx={{ fontSize: '25px', fontWeight: 600, mb: 2 }}>Invoice</Typography>
        <Stack gap={.8}>
          <Divider sx={{ borderBottomWidth: '3px', borderBottomColor: 'black' }} />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Order ID:</b></Typography>
            <Typography>#{data?.id}</Typography>
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Order Date:</b></Typography>
            {data?.createdOn && <Typography>{format(data?.createdOn, 'dd-MMMM-yyyy')}</Typography>}
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Delivery Date:</b></Typography>
            {data?.deliveryDate && <Typography>{format(data?.deliveryDate, 'dd-MMMM-yyyy')}</Typography>}
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Payment Type:</b></Typography>
            <Typography>{data?.paymentType}</Typography>
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Total Price:</b></Typography>
            <Typography>{data?.finalPrice} kr</Typography>
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Due Amount:</b></Typography>
            <Typography>{data?.dueAmount} kr</Typography>
          </Stack>
          <Divider />
          <Stack direction='row'>
            <Typography sx={{ width: '200px' }}> <b>Paid Amount:</b></Typography>
            <Typography>{data?.paidAmount} kr</Typography>
          </Stack>
          <Divider />
        </Stack>
      </Box>

      <Box sx={{ mt: 4 }}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product Description</th>
              <th>Item Price</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.orderCarts?.edges?.map(item => {
                const img = item.node.item.attachments.edges.find(item => item.node.isCover)?.node.fileUrl
                return (
                  <tr key={item.node.id}>
                    <td>
                      <Stack direction='row' gap={1.5} alignItems='center'>
                        <img style={{ borderRadius: '10px', width: '70px', height: '50px', objectFit: 'contain' }}
                          src={img ?? ''} />
                        {/* <Avatar sx={{ borderRadius: '10px', width: '70px' }} src={img ?? ''} /> */}
                        <Box>
                          <Typography>{item?.node.item.name}</Typography>
                          <Typography variant='body2'>Category: {item?.node.item.category.name}</Typography>
                        </Box>
                      </Stack>
                    </td>
                    <td>{item?.node?.priceWithTax} kr </td>
                    <td>x {item?.node?.orderedQuantity}</td>
                    <td>{item?.node?.totalPriceWithTax} kr</td>
                  </tr>
                )
              })
            }
            {/* <tr>
              <td>The lunch collective's Caesar salad</td>
              <td>x6</td>
              <td>$427.33 </td>
              <td>$200.00</td>
            </tr> */}
            <tr>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ fontWeight: 'bold' }}>Total </td>
              <td style={{ fontWeight: 'bold' }}>{data?.finalPrice} kr</td>
            </tr>
            {/* <tr>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ fontWeight: 'bold' }}>Due Amount </td>
              <td style={{ fontWeight: 'bold' }}>{data?.dueAmount} kr</td>
            </tr>
            <tr>
              <td style={{ border: 'none' }}></td>
              <td style={{ border: 'none' }}></td>
              <td style={{ fontWeight: 'bold' }}>Paid Amount </td>
              <td style={{ fontWeight: 'bold' }}>{data?.paidAmount} kr</td>
            </tr> */}
          </tbody>
        </table>
      </Box>

      <Box sx={{ border: '1px solid lightgray', mt: 20, p: 2, minHeight: '150px' }}>
        <Typography sx={{ fontSize: '20px', mb: 2 }}>Note and Term</Typography>
        <Typography>{data?.note}</Typography>
      </Box>

    </Box>
  )
}

export default InvoiceTemplate