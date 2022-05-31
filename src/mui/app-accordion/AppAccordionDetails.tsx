import { styled } from "@mui/material/styles";
import { AccordionDetails } from "@mui/material";

export const AppAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
