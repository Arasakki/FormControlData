import { combineReducers } from "@reduxjs/toolkit";
import accountSlice from "./slice/accountsSlice";

const rootReducer = combineReducers({
  accounts: accountSlice,
});

export default rootReducer;
