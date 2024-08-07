export const calculateIncrease = (current, previous) => {
    if (previous === 0) return "N/A"; // Avoid division by zero
    const increase = ((current - previous) / previous) * 100;
    return `${increase.toFixed(2)}%`;
  };