import { configureStore } from '@reduxjs/toolkit'
import { wardsSlice } from '../Features/Ward/wardSlice'
import { patientsSlice } from '../Features/Patient/patientSlice'
import {hospitalSlice} from '../Features/Hospital/hospitalSlice'


export default configureStore({
  reducer: {
    wards:wardsSlice.reducer,
    patients:patientsSlice.reducer,
    hospital:hospitalSlice.reducer,
  },
})