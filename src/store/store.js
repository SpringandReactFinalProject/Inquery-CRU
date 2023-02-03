import { configureStore } from "@reduxjs/toolkit";
import inqueryReducer from "../component/inquery/inquerySlice";

export const store = configureStore({
    reducer:{
        inquerys:inqueryReducer
    }
});