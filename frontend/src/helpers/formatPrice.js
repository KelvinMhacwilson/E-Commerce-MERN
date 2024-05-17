export const formatPrice = (amount) => {
  const formattedPrice = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  });

  return formattedPrice.format(amount);
};
