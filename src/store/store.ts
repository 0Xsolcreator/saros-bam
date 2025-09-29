import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import authReducer from "./features/authSlice"
import { geckoTerminalApi } from "@/services/api/geckoTerminalApi"
import { dlmmPoolFiltersSlice } from "./features/dlmmPoolFiltersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dlmmPoolFilters: dlmmPoolFiltersSlice.reducer,
    [geckoTerminalApi.reducerPath]: geckoTerminalApi.reducer,
  },
  middleware: (defaultMiddleware) => {
    return defaultMiddleware().concat(geckoTerminalApi.middleware)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout app instead of plain `useDispatch` and `useSelector` for type safety
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
