/**
 * Formats a monetary amount with the appropriate currency symbol and locale formatting.
 * Returns ₹ with Indian locale formatting for INR, or $ with US locale formatting for USD.
 */
export function formatCurrency(amount, currency) {
  if (currency === "INR") return `₹${amount.toLocaleString("en-IN")}`;
  return `$${amount.toLocaleString("en-US")}`;
}
