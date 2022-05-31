import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress
        size={120}
        sx={{ marginTop: "5rem", marginBottom: "1rem" }}
      />
      <Typography>Wczytywanie...</Typography>
    </Box>
  );
};

export default LoadingIndicator;
