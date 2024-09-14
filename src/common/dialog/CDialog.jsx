/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grow, Slide, Zoom } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: theme.spacing(0),
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default function CDialog({ openDialog, closeDialog, children, maxWidth, fullScreen }) {

  return (
    <StyledDialog
      fullScreen={fullScreen}
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