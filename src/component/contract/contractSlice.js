import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const POST_NEW_CONTRACT = 'http://localhost:8080/api/contract/create';
//const GET_ALL_CONTRACT= "http://localhost:8080/api/contract/all";

/*export const fetchContract = createAsyncThunk('projects/fetchProjects', async (token)=>{
    const response = await axios.get(GET_ALL_CONTRACT,{
        headers:{
            'Authorization':token,
        }
    });
    return response.data;
});*/

export const addNewContract = createAsyncThunk('contract/addNewContract', async (data)=>{
    console.log(data.token)
    const response = await axios.post(POST_NEW_CONTRACT,data.contract)
    return response.data
})

const initialState = {
    contract:[],
    status:'idle',
    error: null
}

export const contractSlice = createSlice({
    name:'contract',
    initialState,
    reducers:{
        addProject:{
            reducer(state,action){
                state.push(action.payload);
            },
            prepare(contractDate,conDescription,caseId,setAppointmentId){
               return {
                payload:{
                    contractDate,
                    conDescription,
                    caseId,
                    setAppointmentId
                }
            };           
                   
            }, 
              
    }
    },
    extraReducers(builder){
        builder
            .addCase(addNewContract.fulfilled,(state,action)=>{
                state.contract.push(action.payload)
            })
            
    }
    
});

export const { addContract } = contractSlice.actions;

export default contractSlice.reducer;