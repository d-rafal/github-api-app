import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ActionStatus } from "../../../@types-and-const/@general";
import { SearchResult } from "../../../@types-and-const/search-result";
import { fetchSearchResult } from "../../../api/fetchSearchResult";
import { CustomError } from "../../../utilities/customError";
import checkPraseFieldValidity from "../../code-search-in-github/utilities/checkPraseFieldValidity";
import checkUserNameFieldValidity from "../../code-search-in-github/utilities/checkUserNameFieldValidity";
import { getApiEndpointQueriesFromUrl } from "../utilities/getApiEndpointQueriesFromUrl";

const useDataProvider = () => {
  const location = useLocation();
  const [actionStatus, setActionStatus] =
    useState<ActionStatus>("INITIAL_STATE");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [customError, setCustomError] = useState<CustomError>(
    () => new CustomError("")
  );

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
          throw new CustomError("", "Podaj kryteria wyszukiwania.", "info");
        }

        if (
          checkPraseFieldValidity(apiEndpointQueries.searchPhrase).error ||
          checkUserNameFieldValidity(apiEndpointQueries.searchUserName).error
        ) {
          throw new CustomError("", "Błędne kryteria wyszukiwania!", "info");
        }

        setActionStatus("PROCESSING");
        const data = await fetchSearchResult(
          apiEndpointQueries,
          abortController
        );

        if (!abortController.signal.aborted) {
          setSearchResult(data);
          setActionStatus("SUCCEEDED");
        }
      } catch (error) {
        const customError =
          error instanceof CustomError
            ? error
            : new CustomError((error as Error).message);

        if (
          !abortController.signal.aborted &&
          customError.name !== "AbortError"
        ) {
          console.error(customError.message);
          setCustomError(customError);
          setActionStatus("FAILED");
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [location]);

  return { actionStatus, searchResult, customError };
};

export default useDataProvider;
