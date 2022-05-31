import {
  TableCell,
  Typography,
  TableRow as MuiTableRow,
  styled,
} from "@mui/material";
import { FoundItem } from "../../../@types-and-const/search-result";
import RepoOwnerCell from "./RepoOwnerCell";

const Link = styled("a")({
  textDecoration: "none",
  color: "inherit",

  "&:focus": {
    outline: "#42a5f5 solid 2px",
  },
});

interface Props {
  foundItem: FoundItem;
}

const TableRow = ({ foundItem }: Props) => {
  return (
    <MuiTableRow>
      <TableCell component="th" scope="row" align="left">
        <Link href={foundItem.file.url}>
          <Typography sx={{ display: "inline" }}>
            {foundItem.file.name}
          </Typography>
        </Link>
      </TableCell>
      <TableCell align="left">
        <Typography
          sx={
            {
              // textOverflow: "ellipsis",
              // overflow: "hidden",
              // whiteSpace: "nowrap",
            }
          }
        >
          {foundItem.repoDescription}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <RepoOwnerCell
          login={foundItem.owner.login}
          avatarUr={foundItem.owner.avatarUrl}
        />
      </TableCell>
    </MuiTableRow>
  );
};

export default TableRow;
