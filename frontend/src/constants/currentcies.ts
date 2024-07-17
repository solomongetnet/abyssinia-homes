interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

const currencies: Currency[] = [
  {
    symbol: "ETB",
    name: "Ethiopian Birr",
    symbol_native: "ብር",
    decimal_digits: 2,
    rounding: 0,
    code: "ETB",
    name_plural: "Ethiopian birrs",
  },
];

export default currencies;
