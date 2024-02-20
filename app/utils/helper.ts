import { months } from "@/constants/CONSTS";
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


export const convertDateFormat = (date: string) => {
  const splitDate = date.split("-");
  const day = splitDate[2]
  const year = splitDate[0]
  const monthNumber = Number(splitDate[1])
  const month = months[monthNumber - 1]

  return `${day} ${month} ${year}`;
}