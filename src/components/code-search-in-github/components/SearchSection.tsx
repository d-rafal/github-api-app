import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchFields from "./SearchFields";
import { AppAccordion } from "../../../mui/app-accordion/AppAccordion";
import { AppAccordionSummary } from "../../../mui/app-accordion/AppAccordionSummary";
import { AppAccordionDetails } from "../../../mui/app-accordion/AppAccordionDetails";

const SearchSection = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <AppAccordion
        expanded={expanded}
        onChange={() => setExpanded((expanded) => !expanded)}
        sx={{ mb: 3 }}
      >
        <AppAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter-content"
          id="filter-header"
        >
          <Typography>Kryteria Wyszukiwania</Typography>
        </AppAccordionSummary>
        <AppAccordionDetails sx={{ pt: "2rem", pl: "2rem", pr: "2rem" }}>
          <SearchFields />
        </AppAccordionDetails>
      </AppAccordion>
    </Box>
  );
};

export default SearchSection;
