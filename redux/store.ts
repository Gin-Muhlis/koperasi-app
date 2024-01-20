import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import registerReducer from "./features/register-slice";

export const store = configureStore({
    reducer: {
        registerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector