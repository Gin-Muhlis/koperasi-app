import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedMembers: "[]",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  description: "-",
  subCategoryId: 0,
  modal: false
};

const saving = createSlice({
  name: "Saving",
  initialState,
  reducers: {
    createSaving: (
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
        case "SET_SUB_CATEGORY_ID": 
          return {
            ...state,
            subCategoryId: value
          }
          break;
        case "SET_SELECTED_MEMBERS":
          return {
            ...state,
            selectedMembers: value,
          };
          break;
        case "SET_MODAL":
          return {
            ...state,
            modal: value,
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
