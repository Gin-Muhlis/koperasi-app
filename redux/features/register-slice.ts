import { RegisterState } from "@/types/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "pilih",
    religion: "",
    role: "pilih",
    password: "",
    group_id: "pilih",
    confirmPassword: "",
  } as RegisterState;

export const register = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<{ type: string; value: any }>) => {
      const { type, value } = action.payload;
      switch (type) {
        case "SET_NAME":
          return {
            ...state,
            name: value,
          };

          break;
        case "SET_EMAIL":
          return {
            ...state,
            email: value,
          };
          break;
        case "SET_PHONE":
          return {
            ...state,
            phone: value,
          };
          break;
        case "SET_ADDRESS":
          return {
            ...state,
            address: value,
          };
          break;
        case "SET_GENDER":
          return {
            ...state,
            gender: value,
          };
          break;
        case "SET_RELIGION":
          return {
            ...state,
            religion: value,
          };
          break;
        case "SET_ROLE":
          return {
            ...state,
            role: value,
          };
          break;
        case "SET_POSITION_CATEGORY":
          return {
            ...state,
            group_id: value,
          };
          break;
        case "SET_PASSWORD":
          return {
            ...state,
            password: value,
          };
          break;
        case "SET_CONFIRM_PASSWORD":
          return {
            ...state,
            confirmPassword: value,
          };
          break;
        default:
          return state;
      }
    },
  },
});

export const { signUp } = register.actions;
export default register.reducer;
