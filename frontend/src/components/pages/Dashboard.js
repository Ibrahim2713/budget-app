import React, { useContext } from "react";
import FlexBetween from "../FlexBetween";
import Header from "../Header/Header";
import { DownloadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataContext } from "../../state/Datacontext";
import ExpenseTable from "../../analytics/charts/ExpenseTable";
import Breakdown from "../Breakdown";
import OverviewChart from "../../analytics/charts/OverviewChart";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconBox from "../IconBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { income, expenses, savings } = useContext(DataContext);

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "CreatedAt", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <IconBox
          title="Add Income"
          description="Add Income Entry"
          icon={
            <AddBoxIcon
              sx={{ color: theme.palette.income.main, fontSize: "26px" }}
            />
          }
        />
        <IconBox
          title="Add Savings"
          description="Add Savings Entry"
          icon={
            <AddBoxIcon
              sx={{ color: theme.palette.savings.main, fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.primary.light}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart
            isDashboard={false}
            incomeData={income}
            expensesData={expenses}
            savingsData={savings}
            dataKey="amount"
          />
        </Box>
        <IconBox
          title=""
          description="Since last month"
          icon={
            <AddBoxIcon
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
        />
        <IconBox
          title="Add Expenses"
          description="Add Expense Entry"
          icon={
            <AddBoxIcon
              sx={{ color: theme.palette.expenses.main, fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          <ExpenseTable data={expenses} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.primary.light}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.text.main }}>
            Breakdown
          </Typography>
          <Breakdown isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.text.main }}
          >
            The breakdown provides a comprehensive view of your financial status
            by showcasing your income, savings, expenses, and net worth. It
            highlights key areas of your finances, helping you understand how
            your income is growing, how much you're saving, your spending
            patterns, and your overall net worth. Visual charts make it easy to
            see how each category contributes to your financial health.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
