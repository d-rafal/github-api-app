import { Alert, Box } from "@mui/material";
import { ReportedException } from "../../@types-and-const/@general";

interface Props {
  reportedException: ReportedException;
}
const MessageForUserIndicator = ({ reportedException }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Alert
        variant="filled"
        severity={reportedException.type}
        sx={{ marginTop: "3rem" }}
      >
        {reportedException.messageForUser}
      </Alert>
    </Box>
  );
};
export default MessageForUserIndicator;
