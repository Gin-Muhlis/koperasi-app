import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeSaving: null,
  idTypesaving: null,
  month: 0,
  year: 0,
  amount: 0,
  description: "",
  members: "[]",
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
        case "SET_ID,TYPE_SAVING":
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
        default:
          return state;
      }
    },
  },
});

export const { createSaving } = saving.actions;
export default saving.reducer;
