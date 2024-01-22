import { MemberState } from "@/types/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "pilih",
    religion: "",
    role: "pilih",
    password: "",
    username: "",
    isLoading: false,
    error: false,
    success: false
  } as MemberState;

export const member = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<{ type: string; value: any }>) => {
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
            phone_number: value,
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
        case "SET_USERNAME":
          return {
            ...state,
            username: value,
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
        case "SET_SUCCESS":
          return {
            ...state,
            success: value,
          };
          break;
        default:
          return state;
      }
    },
    addMemberSuccess: () => {
      return initialState
    }
  },
});

export const { addMember, addMemberSuccess } = member.actions;
export default member.reducer;
