import { Typography, Box} from "@mui/material";
import { useTheme } from "@emotion/react";


const Header = ({ title, subtitle }) => {
    const theme = useTheme()

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ mb: "5px" , color: theme.palette.secondary.light}}

      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{
        color: theme.palette.secondary.light
      }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;