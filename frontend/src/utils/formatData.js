export const formatDataByMonth = (data, selectedDate) => {
  // Convert selectedDate to the start of the month in UTC to avoid timezone issues
  const selectedYear = selectedDate.getUTCFullYear();
  const selectedMonth = selectedDate.getUTCMonth();

  console.log('Selected Date:', selectedDate, 'Year:', selectedYear, 'Month:', selectedMonth);

  const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getUTCFullYear();
      const itemMonth = itemDate.getUTCMonth();
      
      console.log('Item Date:', itemDate, 'Year:', itemYear, 'Month:', itemMonth);
      
      return itemYear === selectedYear && itemMonth === selectedMonth;
  });

  const formattedData = filteredData.map(item => {
      const formattedDate = new Date(item.date).toISOString().split('T')[0];
      console.log('Formatted Date:', formattedDate);

      return {
          date: formattedDate,
          amount: Math.floor(Number(item.amount)),
          source: item.source,
          category: item.category,
          description: item.description
      };
  });

  console.log('Formatted Data:', formattedData);
  return formattedData;
};
