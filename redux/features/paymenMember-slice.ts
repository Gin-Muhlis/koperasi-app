import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  members: "[]",
  sub_category_id: 0,
  amount: 0,
  payment_month: "",
};

const paymentmember = createSlice({
  name: "craete payments",
  initialState,
  reducers: {
    createPayments: (
      state,
      action: PayloadAction<{ type: string; value: any }>
    ) => {
      const { type, value } = action.payload;

      switch (type) {
        case "SET_MEMBERS":
          return {
            ...state,
            members: value,
          };
          break;
        case "SET_SUB_CATEGORY":
          return {
            ...state,
            sub_category_id: value,
          };
          break;
        case "SET_AMOUNT":
          return {
            ...state,
            amount: value,
          };
          break;
        case "SET_PAYMENT":
          return {
            ...state,
            payment_month: value,
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

export const { createPayments, resetState } = paymentmember.actions;
export default paymentmember.reducer;
