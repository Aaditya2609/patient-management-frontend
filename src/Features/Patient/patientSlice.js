import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patient/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://patient-management-872z.onrender.com/api/patient"
    );
    return response.data;
  }
);

export const addPatientAsync = createAsyncThunk(
  "patient/addPatientAsync",
  async (newPatient) => {
    const response = await axios.post(
      "https://patient-management-872z.onrender.com/api/patient",
      newPatient
    );
    return response.data;
  }
);

export const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    const response = await axios.post(
      `https://patient-management-872z.onrender.com/api/patient/update/${id}`,
      updatedPatient
    );
    return response.data;
  }
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    const response = await axios.delete(
      `https://patient-management-872z.onrender.com/api/patient/${id}`
    );
    return response.data;
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "idle";
      state.patients.push(action.payload);
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex((s) => s._id === updatedPatient._id);
      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload.patient._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});