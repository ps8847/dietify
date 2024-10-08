import React, { useEffect } from 'react'
import SignInSide from './Components/Signup/SignInSide'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setadminData } from '../../Redux/Slices/Admin_Slice';
import { MAIN_URL } from '../../Configs/Urls';

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');

    // If token exists, verify it by making an API call
    if (token) {
      axios.post(`${MAIN_URL}admin/verify-token`, { token })
        .then(response => {

          console.log("data is : " , response);
          
          // If token is valid, navigate to the /patients page
          if (response.status === 200) {
            dispatch(setadminData(response.data.user))
            navigate('/');
          }
        })
        .catch(error => {
          // Handle error, such as token being invalid
          console.error('Token verification failed', error);
        });
    }
  }, []);

  return (
    <SignInSide />
  )
}

export default SignUp