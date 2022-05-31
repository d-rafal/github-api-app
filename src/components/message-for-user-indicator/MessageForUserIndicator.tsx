import { Alert, Box } from "@mui/material";
import { CustomError } from "../../utilities/customError";

interface Props {
  customError: CustomError;
}
const MessageForUserIndicator = ({ customError }: Props) => {
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
        severity={customError.getType()}
        sx={{ marginTop: "3rem" }}
      >
        {customError.getMessageForUser()}
      </Alert>
    </Box>
  );
};
export default MessageForUserIndicator;
