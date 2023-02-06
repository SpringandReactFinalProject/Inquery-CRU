import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_Appointment = "http://localhost:8585/api/appointment/all";
const POST_NEW_Appointment = "http://localhost:8585/api/appointment/create";
const DELETE_Appointment = "http://localhost:8585/api/appointment/id/";

export const fetchAppointment= createAsyncThunk('appointments/fetchAppointment', async () => {
    const response = await axios.get(GET_ALL_Appointment);
    return response.data;
});

export const addNewAppointment = createAsyncThunk('appointments/addNewAppointment', async(appointment)=>{
    const response = await axios.post(POST_NEW_Appointment,appointment)
    return response.data;
})

export const updateAppointment= createAsyncThunk('appointments/updateAppointment',async (data) => {
    const response = await axios.post(POST_NEW_Appointment,data);
    return response.data
 })

 export const deleteAppointment= createAsyncThunk('appointments/deleteAppointment', async (data) => {
    await axios.delete(`${DELETE_Appointment}${data.appointmentId}`)
    const response = await axios.get(GET_ALL_Appointment);
    return response.data
});

const initialState = {
    appointments: [],
    status: 'idle',
    error: null
}
export const appointmentSlice = createSlice({
    
    name: "apppointments",
    initialState,
    reducers: {
        addAppointment: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare( id,name, consultantFees, clientStatus,lawyerStatus,date,time) {
                return {
                    payload:{
                        id,
                        name, 
                        consultantFees, 
                        clientStatus,
                        lawyerStatus,
                        date,
                        time 
                    }
                }
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAppointment.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAppointment.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.appointments = action.payload
            })
            .addCase(fetchAppointment.rejected, (state, action) => {
                state.status = 'failed'

                state.error = action.error.message
            })
            .addCase(addNewAppointment.fulfilled,(state,action)=>{
                state.appointments.push(action.payload)
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {

                const appointment = action.payload
                

                const appointments = state.appointments.filter(app => app.id !== appointment.id)

                state.appointments = [appointment, ...appointments]


            })
            .addCase(deleteAppointment.fulfilled,(state,action)=>{
                // const appointments = state.appointments.filter(app => app.id !== Number(action.payload))
        
                // state.appointments = appointments
                state.status = 'succeeded';
                state.appointments = action.payload
            })
    }
});

export const selectAllIAppointment = (state) => state.appointments.appointments
export const getAppointmentStatus = (state) => state.appointments.status
export const getAppointmentError = (state) => state.appointments.error
export const selectAppointmentById = (state, appointmentId) => state.appointments.appointments.find(appointment => appointment.id === appointmentId)



export const { addAppointment} = appointmentSlice.actions;

export default appointmentSlice.reducer