import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import registerReducer from "./features/register-slice";
import savingReducer from "./features/saving-slice";
import paymentDeterminationReducer from "./features/paymenMember-slice";
import invoiceReducer from "./features/invoice-slice";
import dataInvoiceReducer from "./features/dataInvoice-slice";
import receivableReducer from "./features/receivable-slice";
import installmentReducer from "./features/installment-slice";

export const store = configureStore({
  reducer: {
    registerReducer,
    savingReducer,
    paymentDeterminationReducer,
    invoiceReducer,
    dataInvoiceReducer,
    receivableReducer,
    installmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
