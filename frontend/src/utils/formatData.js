export const formatDataByMonth = (data, selectedDate) => {
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === selectedDate.getMonth() && itemDate.getFullYear() === selectedDate.getFullYear();
    });
  
    return filteredData.map(item => ({
      date: new Date(item.date).toISOString().split('T')[0],
      amount: Math.floor(Number(item.amount)),
      source: item.source,
      category: item.category,

    }));
  };
  