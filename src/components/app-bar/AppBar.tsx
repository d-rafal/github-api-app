import { Toolbar, Typography, AppBar as MuiAppBar } from "@mui/material";
import HideOnScroll from "./components/HideOnScroll";
import ThemeColorSettings from "./components/ThemeColorSettings";

const AppBar = () => {
  return (
    <>
      <HideOnScroll>
        <MuiAppBar>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">GitHub Api Test</Typography>
            <ThemeColorSettings />
          </Toolbar>
        </MuiAppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

export default AppBar;
