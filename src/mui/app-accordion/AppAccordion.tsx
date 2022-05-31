import { styled } from "@mui/material/styles";
import { Accordion, AccordionProps } from "@mui/material";

export const AppAccordion = styled((props: AccordionProps) => (
  <Accordion elevation={2} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {},
  "&:before": {
    display: "none",
  },
}));
