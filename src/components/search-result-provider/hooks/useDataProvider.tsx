import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ActionStatus,
  ReportedException,
} from "../../../@types-and-const/@general";
import { SearchResult } from "../../../@types-and-const/search-result";
import { fetchSearchResult } from "../../../api/fetchSearchResult";
import { AppException } from "../../../utilities/appException";
import checkPraseFieldValidity from "../../code-search-in-github/utilities/checkPraseFieldValidity";
import checkUserNameFieldValidity from "../../code-search-in-github/utilities/checkUserNameFieldValidity";
import { getApiEndpointQueriesFromUrl } from "../utilities/getApiEndpointQueriesFromUrl";

const useDataProvider = () => {
  const location = useLocation();
  const [actionStatus, setActionStatus] = useState<ActionStatus>({
    status: "INITIAL_STATE",
  });
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const apiEndpointQueries = getApiEndpointQueriesFromUrl(searchParams);

        if (
          !apiEndpointQueries.searchPhrase ||
          !apiEndpointQueries.searchUserName
        ) {
          throw new AppException("", "Podaj kryteria wyszukiwania.", "info");
        }

        if (
          checkPraseFieldValidity(apiEndpointQueries.searchPhrase).error ||
          checkUserNameFieldValidity(apiEndpointQueries.searchUserName).error
        ) {
          throw new AppException("", "Błędne kryteria wyszukiwania!", "info");
        }

        setActionStatus({ status: "PROCESSING" });
        const data = await fetchSearchResult(
          apiEndpointQueries,
          abortController
        );

        if (!abortController.signal.aborted) {
          setSearchResult(data);
          setActionStatus({ status: "SUCCEEDED" });
        }
      } catch (error) {
        console.error((error as AppException | Error).message);

        const reportedException_temp: ReportedException = {
          messageForUser: "Wystąpił Błąd!",
          type: "error",
        };

        if (error instanceof AppException) {
          reportedException_temp.messageForUser = error.getMessageForUser();
          reportedException_temp.type = error.getType();
        }

        if (
          !abortController.signal.aborted &&
          (error as AppException | Error).name !== "AbortError"
        ) {
          setActionStatus({
            status: "FAILED",
            reportedException: reportedException_temp,
          });
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [location]);

  return { actionStatus, searchResult };
};

export default useDataProvider;
