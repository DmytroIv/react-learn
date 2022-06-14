import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/client/features/auth/authSlice';
import ticketReducer from '@/client/features/tickets/ticketSlice';
import noteReducer from '@/client/features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
