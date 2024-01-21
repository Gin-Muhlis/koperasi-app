import { RegisterState, InitialState } from "@/types/interface";
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
    confirmPassword: "",
    isLoading: false,
    error: false
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
        case "SET_IS_LOADING":
          return {
            ...state,
            isLoading: value,
          };
          break;
        case "SET_ERROR":
          return {
            ...state,
            error: value,
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
