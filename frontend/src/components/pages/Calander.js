import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { Dialog, DialogContent, DialogTitle, useTheme, Box } from '@mui/material';
import AddGoalForm from '../Forms/AddGoals';
import { DataContext } from '../../state/Datacontext';
import GoalProgress from '../Dashboard/GoalProgress';
import Legend from '../Legend/Legend';

function Calander() {       
  const { goals, searchTerm } = useContext(DataContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = () => {
    handleClose();
  };

  const colorMapping = {
    income: theme.palette.income.main, 
    savings: theme.palette.savings.main, 
    expenses: theme.palette.expenses.main,
  };

  const filteredGoals = goals.filter(goal =>
    goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const events = filteredGoals.map((item) => ({
    title: `${item.description} (${item.type})`,
    date: item.deadline,
    backgroundColor: colorMapping[item.type] || theme.palette.primary.main,
    borderColor: colorMapping[item.type] || theme.palette.primary.main,
    textColor: theme.palette.text.primary
  }));

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.text.main }}>
      <Box>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={(info) => alert(`Date: ${info.dateStr}`)}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,addGoalButton',
          }}
          customButtons={{
            addGoalButton: {
              text: 'Add Goal',
              click: handleOpen,
            },
          }}
          height="auto"
          eventTextColor={theme.palette.text.main}
          dayHeaderContent={({ date }) => (
            <Box sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Box>
          )}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <AddGoalForm onFormSubmit={handleFormSubmit} onCancel={handleClose} />
        </DialogContent>
      </Dialog>

      <Legend colorMapping={colorMapping} />
      <Box sx={{ mt: 5 }}>
        <GoalProgress onFormSubmit={handleFormSubmit} onCancel={handleClose} />
      </Box>
    </Box>
  );
}

export default Calander;
