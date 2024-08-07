

import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField, useTheme } from "@mui/material";

function CalendarPicker({ selectedDate, setSelectedDate }) {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker 
        sx={{
            backgroundColor: theme.palette.secondary.light
        }}
        views={["year", "month"]}
        label="Select Month"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={null}
            sx={{
              backgroundColor: theme.palette.secondary.light,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default CalendarPicker;
