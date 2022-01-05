import { configureStore } from '@reduxjs/toolkit'
// SAMPLE REDUCER
import counterReducer from './counter/counterSlice';
// UI REDUCERS
import uiFeedbackMessageReducer from './ui/uiFeedbackMessage';
import uiLoadingReducer from './ui/uiLoading';
// AUTHENTICATION REDUCER
import authReducer from './auth/authSlice';
// CONTACTS REDUCER
import contactsReducer from './contacts/contactsSlice';


export const store = configureStore({
  reducer: {
      auth: authReducer,
      counter: counterReducer,
      uiFeedbackMessage: uiFeedbackMessageReducer,
      uiLoading: uiLoadingReducer,
      contacts: contactsReducer
  }
})