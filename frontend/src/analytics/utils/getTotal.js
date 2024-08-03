export function calculateTotalIncome(incomes) {
    if (!Array.isArray(incomes)) {
      throw new Error('Invalid input: incomes should be an array.');
    }
  
    return incomes.reduce((total, income) => {
      if (typeof income.amount !== 'number') {
        throw new Error('Invalid income entry: amount should be a number.');
      }
      return total + income.amount;
    }, 0);
  }
  