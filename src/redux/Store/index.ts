import { combineReducers, legacy_createStore as createStore } from "redux";
import { loadingReducer } from "../Reducers/loadingReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  isLoading: loadingReducer
})

// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    isLoading: loadingReducer,
    
  }
})

export default store