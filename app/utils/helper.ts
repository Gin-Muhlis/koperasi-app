import numeral from "numeral";

// formating number
numeral.register("locale", "id", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  abbreviations: {
    thousand: "Ribu",
    million: "Juta",
    billion: "Miliar",
    trillion: "Triliun",
  },
  ordinal: () => "ke",
  currency: {
    symbol: "Rp",
  },
});

numeral.locale("id");

export const handleFormat = (value: number) => {
  const formated = numeral(value).format("0,0");
  return formated;
};
