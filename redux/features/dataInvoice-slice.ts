import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  principalSaving: 0,
  mandatorySaving: 0,
  specialMandatorySaving: 0,
  voluntarySaving: 0,
  recretionalSaving: 0,
  receivable: 0,
  accountReceivable: 0,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
};

const dataInvoice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    handleInvoice: (
      state,
      action: PayloadAction<{ type: string; value: any }>
    ) => {
      const { type, value } = action.payload;

      switch (type) {
        case "SET_MONTH": 
          return {
            ...state,
            month: value
          }
          break;
        case "SET_YEAR": 
          return {
            ...state,
            year: value
          }
          break;
        case "SET_PRINCIPAL_SAVING": 
          return {
            ...state,
            principalSaving: value
          }
          break;
        case "SET_MANDATORY_SAVING": 
          return {
            ...state,
            mandatorySaving: value
          }
          break;
        case "SET_SPECIAL_MANDATORY_SAVING": 
          return {
            ...state,
            specialMandatorySaving: value
          }
          break;
        case "SET_VOLUNTARY_SAVING": 
          return {
            ...state,
            voluntarySaving: value
          }
          break;
        case "SET_RECRETIONAL_SAVING": 
          return {
            ...state,
            recretionalSaving: value
          }
          break;
        case "SET_RECEIVABLE": 
          return {
            ...state,
            receivable: value
          }
          break;
        case "SET_ACCOUNT_RECEIVABLE": 
          return {
            ...state,
            accountReceivable: value
          }
          break;
                default:
          return state;
      }
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { handleInvoice, resetState } = dataInvoice.actions;
export default dataInvoice.reducer;
