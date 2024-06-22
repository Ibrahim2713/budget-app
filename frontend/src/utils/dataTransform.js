import dayjs from 'dayjs';


 export const groupTransactionsByMonth = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const month = dayjs(transaction.date).format('YYYY-MM');
    if (!acc[month]) {
      acc[month] = { month, total: 0, categories: {} };
    }
    acc[month].total += transaction.amount;
    if (!acc[month].categories[transaction.category]) {
      acc[month].categories[transaction.category] = 0;
    }
    acc[month].categories[transaction.category] += transaction.amount;
    return acc;
  }, {});

  return Object.values(grouped);
};
