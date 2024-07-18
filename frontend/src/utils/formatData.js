export const formatDataByMonth = (data, selectedDate) => {
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate
    })} 