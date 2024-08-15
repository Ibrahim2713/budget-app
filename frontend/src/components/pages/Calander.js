import React, {useContext,useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { Dialog, DialogContent, DialogTitle, useTheme, Box} from '@mui/material';
import AddGoalForm from '../Forms/AddGoals';
import { DataContext } from '../../state/Datacontext';
import GoalProgress from '../Dashboard/GoalProgress';
import Legend from '../Legend/Legend';



function Calander() {       
const {
goals
} = useContext(DataContext);
const theme = useTheme();
console.log(theme)
const [open, setOpen] = useState(false);



const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddGoal = (newGoal) => {
   /* addGoal(newGoal); */
    handleClose();
  };

  const colorMapping = {
    'income': theme.palette.income.main, 
    'savings': theme.palette.savings.main, 
    'expenses': theme.palette.expenses.main, 
   
};



 // Correctly map goals to the format FullCalendar expects
 const events = goals.map((item) => ({
    title: `${item.description} (${item.type})`,
    date: item.deadline,
    backgroundColor: colorMapping[item.type] || theme.palette.primary.main,
    borderColor: colorMapping[item.type] || theme.palette.primary.main,
    textColor: theme.palette.text.primary // Use 'date' instead of 'deadline'
  }));



  return (
    <Box sx={{
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.main
    }}>
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
        dayHeaderContent={({ date }) => {
            return (
                <Box
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 'bold',
                    }}
                >
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </Box>
            );
        }}
      />

      {/* Dialog for the Add Goal Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <AddGoalForm onSave={handleAddGoal} onCancel={handleClose} />
        </DialogContent>
      </Dialog>

      <Legend colorMapping={colorMapping} />
      <Box sx={{
        mt: 5
      }}>
        <GoalProgress />
        </Box>
    </Box>
   
  );
}


export default Calander