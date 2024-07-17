import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slices";
import api from "@/api/api";
import propertyReducer from "./slices/property.slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
