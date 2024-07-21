export const PriceConverter = (
  amount: number,
  currency: string,
  period?: any,
  propertyStatus?: string
) => {
  return (
    <div className="flex gap-1">
      <h2>
        {amount.toLocaleString()} {currency}
      </h2>{" "}
      {propertyStatus === "for rent" && !!period && <strong>/{period}</strong>}
    </div>
  );
};
