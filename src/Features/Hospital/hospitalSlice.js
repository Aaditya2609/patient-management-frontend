import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPatients: 0,
  totalCapacity: 0,
  totalWards:0,
  averageLengthOfStay:0,
  topPerformingWard:null
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    updateHospitalStats: (state, action) => {
      const {
        totalPatients,
        totalCapacity,
        totalWards,
        averageLengthOfStay,
        topPerformingWard
      } = action.payload;

      state.totalPatients = totalPatients;
      state.totalCapacity = totalCapacity;
      state.totalWards = totalWards;
      state.averageLengthOfStay = averageLengthOfStay;
      state.topPerformingWard = topPerformingWard;
    },
    setTopPerformingWard: (state, action) => {
      state.topPerformingWard = action.payload;
    }
  }
});

export const { updateHospitalStats, setTopPerformingWard } = hospitalSlice.actions;
export default hospitalSlice.reducer;