import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

function Calendar() {

/* Create an api route that is able to query transactions by month and return a total for the month
/* use that data to create a useEffect that is dependent on the state of the month and will update and show analytics that correspond with the month */









  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate)
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['month']}
        label="Month"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
