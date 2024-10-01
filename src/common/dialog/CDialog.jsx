/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useMediaQuery, Zoom } from '@mui/material';
import useIsMobile from '../../hook/useIsMobile';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    // borderRadius: '16px',
    padding: theme.spacing(0),
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function CDialog({ openDialog, closeDialog, children, maxWidth, fullScreen }) {

  const isMobile = useIsMobile()

  return (
    <StyledDialog
      fullScreen={isMobile}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth
      onClose={closeDialog}
      open={openDialog}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </StyledDialog>
  );
}