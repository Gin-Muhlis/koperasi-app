import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  idTypeInstallment: "",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  description: "-",
  members: "[]",
};

export const installment = createSlice({
  name: "saving",
  initialState,
  reducers: {
    createInstallment: (
      state,
      action: PayloadAction<{ type: string; value: any }>
    ) => {
      const { type, value } = action.payload;
      switch (type) {
        case "SET_ID_TYPE_SAVING":
          return {
            ...state,
            idTypeInstallment: value,
          };
          break;
        case "SET_MONTH":
          return {
            ...state,
            month: value,
          };
          break;
        case "SET_YEAR":
          return {
            ...state,
            year: value,
          };
          break;
        case "SET_MEMBERS":
          return {
            ...state,
            members: value,
          };
          break;
        case "SET_DESCRIPTION":
          return {
            ...state,
            description: value,
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

export const { createInstallment, resetState } = installment.actions;
export default installment.reducer;
