interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface PriceInput {
  currency: Currency;
  Amount: number; // Using Amount instead of price
}

function createPriceJSON(currency: Currency, Amount: number): string {
  const priceObject: PriceInput = {
    currency,
    Amount,
  };

  return JSON.stringify(priceObject);
}

// Example usage:
const usdCurrency: Currency = {
  symbol: "$",
  name: "US Dollar",
  symbol_native: "$",
  decimal_digits: 2,
  rounding: 0,
  code: "USD",
  name_plural: "US dollars",
};

const Amount = 100.5; // Example Amount

const priceJSON = createPriceJSON(usdCurrency, Amount);
console.log(priceJSON);
