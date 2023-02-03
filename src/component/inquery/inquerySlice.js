import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_INQUERY = "http://localhost:8585/api/inquery/all";
const POST_NEW_INQUERY = "http://localhost:8585/api/inquery/create";

export const fetchInquery = createAsyncThunk('inquerys/fetchInquery', async () => {
    const response = await axios.get(GET_ALL_INQUERY);
    return response.data;
});

export const addNewInquery = createAsyncThunk('inquerys/addNewInquery', async (data) => {

    const response = await axios.post(POST_NEW_INQUERY, data.inquery)
    return response.data
});

const initialState = {
    inquerys: [],
    status: 'idle',
    error: null
}
export const inquerySlice = createSlice({
    name: "inquerys",
    initialState,
    reducers: {
        addInquery: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare( userId, phoneNo, lawyerName, description) {
                return {
                    payload: {
                        userId,
                        phoneNo,
                        lawyerName,
                        description
                    }
                }
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchInquery.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchInquery.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.inquerys = action.payload
            })
            .addCase(fetchInquery.rejected, (state, action) => {
                state.status = 'failed'

                state.error = action.error.message
            })
            .addCase(addNewInquery.fulfilled,(state,action)=>{
                state.inquerys.push(action.payload)
            })
    }
});

export const selectAllInquery = (state) => state.inquerys.inquerys
export const getInqueryStatus = (state) => state.inquerys.status
export const getInqueryError = (state) => state.inquerys.error
export const { addInquery} = inquerySlice.actions;

export default inquerySlice.reducer