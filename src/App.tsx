import { Box, Container, Paper } from "@mui/material";
import AppBar from "./components/app-bar/AppBar";
import CodeSearchInGithub from "./components/code-search-in-github/CodeSearchInGithub";
import SearchResultProvider from "./components/search-result-provider/SearchResultProvider";

function App() {
  return (
    <Box component={Paper} sx={{ minHeight: "100vh" }}>
      <AppBar />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "1rem",
          marginBottom: "0",
          padding: "1rem 1rem 2rem",
        }}
      >
        <SearchResultProvider>
          <CodeSearchInGithub />
        </SearchResultProvider>
      </Container>
    </Box>
  );
}

export default App;
