import { styled } from "@mui/material";
import Button from '@mui/material/Button';

 export const GreenButton = styled(Button)({
    backgroundColor: '#1DB954', // Green color
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049', // Darker green on hover
    },
  });
  
   export const RedButton = styled(Button)({
    backgroundColor: '#FF003F', // Red color
    color: 'white',
    '&:hover': {
      backgroundColor: '#c62828', // Darker red on hover
    },
  });
  
   export const PinkButton = styled(Button)({
    backgroundColor: '#FF00BF', // Pink color
    color: 'white',
    '&:hover': {
      backgroundColor: '#d81b60', // Darker pink on hover
    },
  });
  
  
  