import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";

const IconBox = ({ title,   icon, description, color }) => {

  const theme = useTheme();
  











  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.primary.light}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary.light }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

 
      <FlexBetween gap="1rem">
       
        <Typography  
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }} >{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default IconBox;
