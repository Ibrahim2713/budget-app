export const getTotalByMonth = (data, selectedDate) => {
    // Convert selectedDate to the start of the month in UTC to avoid timezone issues
    const selectedYear = selectedDate.getUTCFullYear();
    const selectedMonth = selectedDate.getUTCMonth();



    // Filter the data based on the selected year and month
    const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        const itemYear = itemDate.getUTCFullYear();
        const itemMonth = itemDate.getUTCMonth();
        

        
        return itemYear === selectedYear && itemMonth === selectedMonth;
    });

    // Calculate the total amount for the filtered data
    const totalAmount = filteredData.reduce((total, item) => {
        return total + Number(item.amount);
    }, 0);



    return totalAmount;
};
