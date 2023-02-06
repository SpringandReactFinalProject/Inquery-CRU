import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_INQUERY = "http://localhost:8585/api/inquery/all";
const POST_NEW_INQUERY = "http://localhost:8585/api/inquery/create";
const DELETE_INQUERY = "http://localhost:8585/api/inquery/id/";

export const fetchInquery = createAsyncThunk('inquerys/fetchInquery', async () => {
    const response = await axios.get(GET_ALL_INQUERY);
    return response.data;
});

export const addNewInquery = createAsyncThunk('inquerys/addNewInquery', async(inquery)=>{
    const response = await axios.post(POST_NEW_INQUERY,inquery)
    return response.data;
})

export const updateInquery= createAsyncThunk('inquerys/updateInquery',async (data) => {
    const response = await axios.post(POST_NEW_INQUERY,data);
    return response.data
 })

 export const deleteInquery = createAsyncThunk('inquerys/deleteInquery', async (data) => {
    await axios.delete(`${DELETE_INQUERY}${data.inqueryId}`)
    const response = await axios.get(GET_ALL_INQUERY);
     
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
            prepare( id,phoneNo, lawyerName, description) {
                return {
                    payload:{
                        id,
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
            .addCase(updateInquery.fulfilled, (state, action) => {

                const inquery = action.payload
                

                const inquerys = state.inquerys.filter(inq => inq.id !== inquery.id)

                state.inquerys = [inquery, ...inquerys]


            })
            // .addCase(deleteInquery.fulfilled,(state,action)=>{
            //     const inquerys = state.inquerys.filter(inq => inq.id !== Number(action.payload))
        
            //     state.inquerys = inquerys
        
            // })
            .addCase(deleteInquery.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inquerys = action.payload
            })
    }
});

export const selectAllInquery = (state) => state.inquerys.inquerys
export const getInqueryStatus = (state) => state.inquerys.status
export const getInqueryError = (state) => state.inquerys.error
export const selectInqueryById = (state, inqueryId) => state.inquerys.inquerys.find(inquery => inquery.id === inqueryId)



export const { addInquery} = inquerySlice.actions;

export default inquerySlice.reducer