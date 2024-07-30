// Mock data for Layout component
const mockData =[{
    totalCustomers: 3200,
    todayStats: {
      totalSales: 350,
    },
    thisMonthStats: {
      totalSales: 7800,
    },
    yearlySalesTotal: 95000,
    transactions: [
      { _id: '1', userId: 'U1001', createdAt: '2024-07-01', products: ['Product A', 'Product B'], cost: 200.0 },
      { _id: '2', userId: 'U1002', createdAt: '2024-07-02', products: ['Product C'], cost: 150.0 },
      { _id: '3', userId: 'U1003', createdAt: '2024-07-03', products: ['Product D', 'Product E', 'Product F'], cost: 400.0 },
      { _id: '4', userId: 'U1004', createdAt: '2024-07-04', products: ['Product G'], cost: 120.0 },
      { _id: '5', userId: 'U1005', createdAt: '2024-07-05', products: ['Product H', 'Product I'], cost: 350.0 },
      // Add more transactions as needed
    ],
  }];
  
  export default mockData;
  