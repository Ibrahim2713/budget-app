import React, { useContext, useState } from "react";
import FlexBetween from "../FlexBetween";
import Header from "../Header/Header";
import { DownloadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataContext } from "../../state/Datacontext";
import ExpenseTable from "../../analytics/charts/ExpenseTable";
import Breakdown from "../Dashboard/Breakdown";
import OverviewChart from "../../analytics/charts/OverviewChart";
import AddEntryForm from "../Forms/AddEntryForm";
import AddGoalForm from "../Forms/AddGoals";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconBox from "../Dashboard/IconBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { income, expenses, savings, user} = useContext(DataContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDataType, setCurrentDataType] = useState(null);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = () => {
    handleDialogClose();
  };

  const handleOpenForm = (dataType) => {
    setCurrentDataType(dataType);
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setCurrentDataType(null);
  };

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle={`Welcome to your dashboard ${user.first_name}!` }/>

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
              onClick={() => handleOpenForm("Income")}
              sx={{ color: theme.palette.income.main, fontSize: "26px" }}
            />
          }
        />
        <IconBox
          title="Add Savings"
          description="Add Savings Entry"
          icon={
            <AddBoxIcon
              onClick={() => handleOpenForm("Savings")}
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
          title="Add New Goal"
          description="Add a new goal you would like to achieve"
          icon={
            <AddBoxIcon
              onClick={handleDialogOpen}
              sx={{ color: theme.palette.secondary.light, fontSize: "26px" }}
            />
          }
        />
        <IconBox
          title="Add Expenses"
          description="Add Expense Entry"
          icon={
            <AddBoxIcon
              onClick={() => handleOpenForm("Expenses")}
              sx={{ color: theme.palette.expenses.main, fontSize: "26px" }}
            />
          }
        />

        {/* FORM MODAL */}
        <Modal
          open={isFormVisible}
          onClose={handleCloseForm}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
            }}
          >
            <AddEntryForm
              onCancel={handleCloseForm}
              dataType={currentDataType} // Pass the selected data type
            />
          </Box>
        </Modal>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogContent>
            <AddGoalForm
              onFormSubmit={handleFormSubmit}
              onCancel={handleDialogClose}
            />
          </DialogContent>
        </Dialog>

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
