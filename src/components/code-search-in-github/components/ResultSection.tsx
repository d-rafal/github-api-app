import { CustomError } from "../../../utilities/customError";
import LoadingIndicator from "../../loading-indicator/LoadingIndicator";
import MessageForUserIndicator from "../../message-for-user-indicator/MessageForUserIndicator";
import { useSearchingStatusContext } from "../../search-result-provider/SearchResultProvider";
import TableWithResults from "./TableWithResults";

const ResultSection = () => {
  const searchingStatus = useSearchingStatusContext();

  if (searchingStatus.actionStatus === "FAILED") {
    return (
      <MessageForUserIndicator customError={searchingStatus.customError} />
    );
  } else if (searchingStatus.actionStatus === "PROCESSING") {
    return <LoadingIndicator />;
  } else if (searchingStatus.actionStatus === "SUCCEEDED") {
    return searchingStatus.searchResult?.items.length ? (
      <TableWithResults foundItems={searchingStatus.searchResult?.items} />
    ) : (
      <MessageForUserIndicator
        customError={
          new CustomError(
            "",
            "Brak rezultów dla podanych kryteriów wyszukiwania.",
            "info"
          )
        }
      />
    );
  } else return null;
};

export default ResultSection;
