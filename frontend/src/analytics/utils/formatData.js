export const formatDataByMonth = (data, selectedDate) => {

   
  // Convert selectedDate to the start of the month in UTC to avoid timezone issues
  const selectedYear = selectedDate.getUTCFullYear();
  const selectedMonth = selectedDate.getUTCMonth();



  const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getUTCFullYear();
      const itemMonth = itemDate.getUTCMonth();
      

      
      return itemYear === selectedYear && itemMonth === selectedMonth;
  });

  const formattedData = filteredData.map(item => {
      const formattedDate = new Date(item.date).toISOString().split('T')[0];
    

      return {
          date: formattedDate,
          amount: Math.floor(Number(item.amount)),
          source: item.source,
          category: item.category_name || item.category,
          description: item.description,
          id: item.id,
          children: item.children
      };
  });

  return formattedData;
};
