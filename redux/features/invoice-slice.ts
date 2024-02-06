import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  listSimpananPokok: "[]",
  listSimpananWajib: "[]",
  listSimpananWajibKhusus: "[]",
  listSimpananSukarela: "[]",
  listTabunganRekreasi: "[]",
  listPiutangSp: "[]",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const invoice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    setInvoice: (
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
        case "SET_SIMPANAN_POKOK":
          return {
            ...state,
            listSimpananPokok: value,
          };
          break;
        case "SET_SIMPANAN_WAJIB":
          return {
            ...state,
            listSimpananWajib: value,
          };
          break;
        case "SET_SIMPANAN_WAJIB_KHUSUS":
          return {
            ...state,
            listSimpananWajibKhusus: value,
          };
          break;
        case "SET_SIMPANAN_SUKARELA":
          return {
            ...state,
            listSimpananSukarela: value,
          };
          break;
        case "SET_TABUNGAN_REKREASI":
          return {
            ...state,
            listTabunganRekreasi: value,
          };
          break;
        case "SET_PIUTANG_SP":
          return {
            ...state,
            listPiutangSp: value,
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

export const { setInvoice, resetState } = invoice.actions;
export default invoice.reducer;