import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeSaving: "",
  idTypesaving: "",
  month: "01",
  year: new Date().getFullYear(),
  amount: 0,
  description: "",
  members: "[]",
  isSelectAll: false,
};

export const saving = createSlice({
  name: "saving",
  initialState,
  reducers: {
    createSaving: (
      state,
      action: PayloadAction<{ type: string; value: any }>
    ) => {
      const { type, value } = action.payload;
      switch (type) {
        case "SET_TYPE_SAVING":
          return {
            ...state,
            typeSaving: value,
          };
          break;
        case "SET_ID_TYPE_SAVING":
          return {
            ...state,
            idTypeSaving: value,
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
        case "SET_AMOUNT":
          return {
            ...state,
            amount: value,
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
        case "SET_IS_SELECT_ALL":
          return {
            ...state,
            isSelectAll: value,
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

export const { createSaving, resetState } = saving.actions;
export default saving.reducer;
