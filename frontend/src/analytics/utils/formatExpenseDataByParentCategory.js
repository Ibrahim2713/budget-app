export const formatExpenseDataByMonthAndParentCategory = (data, selectedDate) => {
    // Convert selectedDate to the start of the month in UTC to avoid timezone issues
    const selectedYear = selectedDate.getUTCFullYear();
    const selectedMonth = selectedDate.getUTCMonth() + 1; // Adjust for 1-based month

    // Initialize a map to track totals by parent category
    const parentCategoryTotals = {};

    // Filter and aggregate data
    data.forEach(item => {
        // Check if the item matches the selected month and year
        if (item.year === selectedYear && item.month === selectedMonth) {
            const parentCategory = item.parent_name || item.category; // Use parent_name if available, otherwise use category

            if (!parentCategoryTotals[parentCategory]) {
                parentCategoryTotals[parentCategory] = 0;
            }

            parentCategoryTotals[parentCategory] += item.amount;
        }
    });

    // Convert the parent category totals to an array of objects for the pie chart
    const formattedData = Object.entries(parentCategoryTotals).map(([name, value]) => ({
        name,
        value
    }));

    return formattedData;
};
