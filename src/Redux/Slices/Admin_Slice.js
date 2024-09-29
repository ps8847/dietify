import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,
  isTokenFetched : false,
};


const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {
    setadminData: (state, action) => {
      state.adminData = action.payload;
    },
    setisTokenFetched: (state, action) => {
      state.isTokenFetched = action.payload;
    },
  },

  extraReducers: (builder) => {
  
  },
});

export const {
    setadminData,
    setisTokenFetched
} = AdminSlice.actions;

export default AdminSlice.reducer;
