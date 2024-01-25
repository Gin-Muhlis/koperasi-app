import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import registerReducer from "./features/register-slice";
import addMemmberReducer from "./features/addMember-slice";
import editMemberReducer from "./features/editMember-slice";

export const store = configureStore({
    reducer: {
        registerReducer,
        addMemmberReducer,
        editMemberReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector