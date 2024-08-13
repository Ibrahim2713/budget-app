import React, {useContext,useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { Button, Dialog, DialogContent, DialogTitle, useTheme } from '@mui/material';
import AddGoalForm from '../Forms/AddGoals';
import { DataContext } from '../../state/Datacontext';



function Calander() {       
const {
goals
} = useContext(DataContext);
const theme = useTheme();
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



 // Correctly map goals to the format FullCalendar expects
 const events = goals.map((item) => ({
    title: `${item.description} (${item.type})`,
    date: item.deadline, // Use 'date' instead of 'deadline'
  }));



  return (
    <>
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
        eventTextColor={theme.palette.text.primary}
      />

      {/* Dialog for the Add Goal Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <AddGoalForm onSave={handleAddGoal} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}


export default Calander