import { MemberState } from "@/types/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    id: 0,
    name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "pilih",
    religion: "",
    position: "pilih",
    role: "pilih",
    password: "",
    username: "",
    active: true,
    isLoading: false,
    error: false,
    success: false
  } as MemberState;

export const editMember = createSlice({
  name: "auth",
  initialState,
  reducers: {
    stateEditMember: (state, action: PayloadAction<{ type: string; value: any }>) => {
      const { type, value } = action.payload;
      switch (type) {
        case "SET_ID":
          return {
            ...state,
            id: value,
          };

          break;
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
          case "SET_POSITION":
            return {
              ...state,
              position: value,
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
        case "SET_ACTIVE":
          return {
            ...state,
            active: value,
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
    resetStateMember: () => {
      return initialState
    }
  },
});

export const { stateEditMember, resetStateMember } = editMember.actions;
export default editMember.reducer;
