import { TableCell, TableRow, Typography } from "@mui/material";

const TableHeader = () => {
  return (
    <TableRow>
      <TableCell align="left">
        <Typography sx={{ fontSize: "inherit" }}>Nazwa Pliku</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography sx={{ fontSize: "inherit" }}>Opis Repozytorium</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography sx={{ fontSize: "inherit" }}>Właściciel</Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableHeader;
