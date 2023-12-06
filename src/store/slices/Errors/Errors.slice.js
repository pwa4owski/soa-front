import {createSlice} from '@reduxjs/toolkit'
import {emptyError, errorsInitialState} from "./Errors.helpers";

export const ErrorsSlice = createSlice({
  name: 'errors',
  initialState: errorsInitialState,
  reducers: {
    setNewError: (state, action) => {
      state.error = {
        ...emptyError,
        ...action.payload
      };
    },
    clearAllErrors: (state) => {
      state = errorsInitialState;
    }
  }
})

export const {
  setNewError,
  clearAllErrors
} = ErrorsSlice.actions;

export default ErrorsSlice.reducer;