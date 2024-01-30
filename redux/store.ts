import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import registerReducer from "./features/register-slice";
import savingReducer from "./features/saving-slice";
import paymentDeterminationReducer from "./features/paymenMember-slice";

export const store = configureStore({
  reducer: {
    registerReducer,
    savingReducer,
    paymentDeterminationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
