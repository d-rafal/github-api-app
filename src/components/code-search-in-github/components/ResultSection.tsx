import LoadingIndicator from "../../loading-indicator/LoadingIndicator";
import MessageForUserIndicator from "../../message-for-user-indicator/MessageForUserIndicator";
import { useSearchingStatusContext } from "../../search-result-provider/SearchResultProvider";
import TableWithResults from "./TableWithResults";

const ResultSection = () => {
  const searchingStatus = useSearchingStatusContext();

  if (searchingStatus.actionStatus.status === "FAILED") {
    return (
      <MessageForUserIndicator
        reportedException={searchingStatus.actionStatus.reportedException}
      />
    );
  } else if (searchingStatus.actionStatus.status === "PROCESSING") {
    return <LoadingIndicator />;
  } else if (searchingStatus.actionStatus.status === "SUCCEEDED") {
    return searchingStatus.searchResult?.items.length ? (
      <TableWithResults foundItems={searchingStatus.searchResult?.items} />
    ) : (
      <MessageForUserIndicator
        reportedException={{
          messageForUser: "Brak rezultów dla podanych kryteriów wyszukiwania.",
          type: "info",
        }}
      />
    );
  } else return null;
};

export default ResultSection;
