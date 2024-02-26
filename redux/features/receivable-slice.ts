import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeReceivable: "",
  idTypeReceivable: "",
  description: "-",
  members: "[]",
};

export const receivable = createSlice({
  name: "saving",
  initialState,
  reducers: {
    createReceivable: (
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

export const { createReceivable, resetState } = receivable.actions;
export default receivable.reducer;
