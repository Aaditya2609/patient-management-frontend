import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWards = createAsyncThunk(
  "ward/fetchWards",
  async () => {
    const response = await axios.get(
      "https://patient-management-872z.onrender.com/api/ward"
    );
    console.log(response)
    return response.data;
  }
);

export const addWardAsync = createAsyncThunk(
  "ward/addWardAsync",
  async (newWard) => {
    const response = await axios.post(
      "https://patient-management-872z.onrender.com/api/ward",
      newWard
    );
    return response.data;
  }
);

export const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    const response = await axios.post(
      `https://patient-management-872z.onrender.com/api/ward/update/${id}`,
      updatedWard
    );
    return response.data;
  }
);

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(
      `https://patient-management-872z.onrender.com/api/ward/${id}`
    );
    return response.data;
  }
);

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex((s) => s._id === updatedWard._id);
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload.ward._id
      );
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});