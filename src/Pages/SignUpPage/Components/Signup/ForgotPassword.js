import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import axios from 'axios';

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading  ,  setLoading] = useState(false)
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter OTP, 3: Enter new password
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post('https://doctorbackend.mhtm.ca/api/admin/reset-password', { email });
      setOtpSent(true);
      setStep(2); // Move to OTP verification step
      setLoading(false)
    } catch (error) {
      console.log(error);
      
      setErrorMessage('Failed to send OTP. Please check the email.');
      setLoading(false)
    }
  };
  
  // Function to verify OTP and reset the password
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      console.log( email, otp, newPassword );
      
      const response = await axios.post('https://doctorbackend.mhtm.ca/api/admin/verify-otp', { email, otp, new_password: newPassword });
      console.log("response is :" , response);
      
      resetPopups(2); // Reset back after successful password reset
      handleClose();
      setLoading(false)
    } catch (error) {
      console.log(error);
      
      setErrorMessage('Invalid OTP or failed to reset password.');
      setLoading(false)
    }
  };
  
  // Function to resend OTP
  const resendOtp = async () => {
    setLoading(true)
    try {
      await axios.post('https://doctorbackend.mhtm.ca/api/admin/resend-otp', { email });
      setErrorMessage('OTP has been resent to your email.');
      setLoading(false)
    } catch (error) {
      setErrorMessage('Failed to resend OTP.');
      setLoading(false)
    }
  };

  let resetPopups = () => {

    setEmail('')
    setOtp('')
    setNewPassword('')
    setLoading(false)
    setStep(1)
    setOtpSent(false)
    setErrorMessage('')
  }

  return (
    <Dialog
      open={open}
      onClose={() => {resetPopups();  handleClose()}}
      PaperProps={{
        component: 'form',
        onSubmit: step === 1 ? sendOtp : step === 2 ? verifyOtp : verifyOtp,
      }}
    >
      <DialogTitle>{step === 1 ? 'Reset Password' : step === 2 ? 'Verify OTP' : 'New Password'}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        {step === 1 && (
          <>
            <DialogContentText>
              Enter your account&apos;s email address for which you want to reset the password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"

              placeholder="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <DialogContentText>Enter the OTP sent to your email and new password.</DialogContentText>
            <OutlinedInput
              autoFocus
              required
              sx={{
                '& .MuiOutlinedInput-notchedOutline legend': { color: 'black' }, // Apply color to the legend
              }}
              margin="dense"
              id="otp"
              name="otp"
          
              placeholder="Enter OTP"
              type="text"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="newPassword"
              name="newPassword"
       
              placeholder="Enter New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={resendOtp} variant="text">
              Resend OTP
            </Button>
          </>
        )}
    
        {errorMessage && <DialogContentText color="error">{errorMessage}</DialogContentText>}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={() => {resetPopups();  handleClose()}}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {step === 1 ? (loading ? 'Sending OTP ...' : "Send OTP") : (loading ? "Reseting Password ... " : 'Reset Password')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
