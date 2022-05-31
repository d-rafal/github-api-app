import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useInversePaletteModeContext } from "../../theme/AppThemeProvider";

const ThemeColorSettings = () => {
  const inversePaletteMode = useInversePaletteModeContext();
  const theme = useTheme();

  return (
    <IconButton onClick={inversePaletteMode} color="inherit">
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export default ThemeColorSettings;
