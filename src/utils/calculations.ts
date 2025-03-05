/**
 * Calculates the number of new shares needed to reach a target average price.
 * 
 * Formula: 
 * New Shares = ((Target Average × Current Shares) - Current Investment) / (Market Price - Target Average)
 * 
 * @param currentInvestment Total cost of current shares
 * @param currentShares Number of shares currently owned
 * @param marketPrice Current market price per share
 * @param targetAverage Desired average price per share
 * @returns Number of new shares needed to reach target average, or null if impossible
 */
export const calculateNewShares = (
  currentInvestment: number,
  currentShares: number,
  marketPrice: number,
  targetAverage: number
): number | null => {
  // If target average is lower than the market price, it's impossible to reach it by buying more
  if (marketPrice >= targetAverage) {
    return null;
  }

  // Calculate new shares needed
  const newShares = ((targetAverage * currentShares) - currentInvestment) / (marketPrice - targetAverage);
  
  return newShares > 0 ? Math.ceil(newShares) : null; // Round up to whole shares
};

/**
 * Calculates the new average price after buying additional shares.
 * 
 * @param currentInvestment Total cost of current shares
 * @param currentShares Number of shares currently owned
 * @param newShares Number of new shares to purchase
 * @param marketPrice Current market price
 * @returns New average price per share
 */
export const calculateNewAverage = (
  currentInvestment: number,
  currentShares: number,
  newShares: number,
  marketPrice: number
): number => {
  const totalCost = currentInvestment + (newShares * marketPrice);
  const totalShares = currentShares + newShares;
  
  return totalCost / totalShares;
};

/**
 * Calculates the total cost of purchasing new shares.
 * 
 * @param newShares Number of new shares to purchase
 * @param marketPrice Current market price
 * @returns Total cost of new shares
 */
export const calculateTotalCost = (
  newShares: number,
  marketPrice: number
): number => {
  return newShares * marketPrice;
};

/**
 * Calculates the percentage change in the average price after buying new shares.
 * 
 * Formula:
 * Percent Change = ((Old Average Price - New Average Price) / Old Average Price) * 100
 * 
 * @param oldAverage Previous average price per share
 * @param newAverage New average price after buying additional shares
 * @returns Percentage decrease in average price
 */
export const calculatePercentChange = (
  oldAverage: number,
  newAverage: number
): number => {
  return ((oldAverage - newAverage) / oldAverage) * 100;
};
