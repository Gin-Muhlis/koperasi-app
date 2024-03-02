import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedMembers: "[]",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  description: "-"
};

const invoice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    setInvoice: (
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
        case "SET_DESCRIPTION": 
          return {
            ...state,
            description: value
          }
          break;
        case "SET_SELECTED_MEMBERS":
          return {
            ...state,
            selectedMembers: value,
          };
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

export const { setInvoice, resetState } = invoice.actions;
export default invoice.reducer;
