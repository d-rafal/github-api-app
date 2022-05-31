import { CustomError } from "../utilities/customError";
import { ApiEndpointQueries } from "./fetchSearchResult";

const WRONG_QUERY_PARAMS_MESSAGE = "wrong query parameters!";

export const prepareQueryString = (
  apiEndpointQueryParams: ApiEndpointQueries
): never | string => {
  let searchQuery = "";

  if (!apiEndpointQueryParams.searchPhrase) {
    throw new CustomError(WRONG_QUERY_PARAMS_MESSAGE, "Brak szukanej frazy.");
  } else if (!apiEndpointQueryParams.searchUserName) {
    throw new CustomError(
      WRONG_QUERY_PARAMS_MESSAGE,
      "Brak nazwy użytkownika, którego repozytoria mają być przeszukane."
    );
  } else {
    searchQuery = `"${apiEndpointQueryParams.searchPhrase}" user:${apiEndpointQueryParams.searchUserName}`;

    if (apiEndpointQueryParams.searchLanguage) {
      searchQuery += ` language:${apiEndpointQueryParams.searchLanguage}`;
    }
  }

  const searchParams = new URLSearchParams();

  if (apiEndpointQueryParams.page) {
    searchParams.set("page", String(apiEndpointQueryParams.page));
  }

  if (apiEndpointQueryParams.itemsPerPage) {
    searchParams.set("per_page", apiEndpointQueryParams.itemsPerPage);
  }

  searchParams.set("q", searchQuery);

  return "?" + searchParams.toString();
};
