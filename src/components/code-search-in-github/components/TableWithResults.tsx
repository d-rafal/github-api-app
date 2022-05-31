import {
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import { FoundItem } from "../../../@types-and-const/search-result";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Caption = styled("caption")`
  caption-side: top !important;
`;

interface Props {
  foundItems: FoundItem[] | undefined;
}

const TableWithResults = ({ foundItems }: Props) => {
  return (
    <Container
      maxWidth="xl"
      component={Paper}
      elevation={6}
      sx={{
        marginBottom: "1rem",
        padding: "1rem 1rem 2rem",
      }}
    >
      <TableContainer
        sx={{
          "& .MuiTableCell-head": {
            fontSize: "1.3rem",
          },
        }}
      >
        <Table
          size="small"
          aria-label="wyszukany kod"
          sx={{ tableLayout: "auto", width: "100%" }}
        >
          <Caption>
            <Typography
              variant="h4"
              component="h4"
              sx={{ textAlign: "center" }}
            >
              Dopasowane Rezultaty Wyszukiwania
            </Typography>
          </Caption>
          <TableHead>
            <TableHeader />
          </TableHead>
          <TableBody>
            {foundItems?.map((foundItem) => (
              <TableRow key={foundItem.file.url} foundItem={foundItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableWithResults;
