import { Typography, Box} from "@mui/material";
import { useTheme } from "@emotion/react";


const Header = ({ title, subtitle }) => {
    const theme = useTheme()

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", color: theme.palette.secondary.main}}

      >
        {title}
      </Typography>
      <Typography variant="h5" sx={{
        color: theme.palette.secondary.main
      }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;