import {configureStore} from '@reduxjs/toolkit'
import PersonReducer from "./slices/Persons/Persons.slice";
import ErrorReducer from "./slices/Errors/Errors.slice";

export const store = configureStore({
  reducer: {
    persons: PersonReducer,
    errors: ErrorReducer
  },
})