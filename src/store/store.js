import { configureStore } from "@reduxjs/toolkit";
import inqueryReducer from "../component/inquery/inquerySlice";
import appointmentReducer from "../component/appointment/appointmentSlice";

export const store = configureStore({
    reducer:{
        inquerys:inqueryReducer,
        appointments:appointmentReducer
    }
});