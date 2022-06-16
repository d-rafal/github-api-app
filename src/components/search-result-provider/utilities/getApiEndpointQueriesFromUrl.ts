import {
  DEFAULT_ITEMS_PER_PAGE,
  isValidItemsPerPageQueryInURL,
  ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME,
} from "../../../@types-and-const/@url-queries/@items-per-page";
import {
  isValidLanguageQueryInURL,
  LANGUAGE_QUERY_IN_URL_KEY_NAME,
} from "../../../@types-and-const/@url-queries/@language";
import { PHRASE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@phrase";
import { OWNER_NAME_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@user-name";
import tryConvertToFiniteNumberNullAsZero from "../../../utilities/tryConvertToFiniteNumberNullAsZero";
import { valueFromUrlQueryTypeGuard } from "../../../utilities/valueFromUrlQueryTypeGuard";
import { ApiEndpointQueries } from "../../../api/fetchSearchResult";
import { PAGE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@page";

export const getApiEndpointQueriesFromUrl = (
  searchParams: URLSearchParams
): never | ApiEndpointQueries => {
  const itemsPerPage = valueFromUrlQueryTypeGuard(
    searchParams.get(ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME),
    DEFAULT_ITEMS_PER_PAGE,
    isValidItemsPerPageQueryInURL
  );

  let page = tryConvertToFiniteNumberNullAsZero(
    searchParams.get(PAGE_QUERY_IN_URL_KEY_NAME)
  );
  if (!page || page < 0) {
    page = 1;
  }

  const searchPhrase = searchParams.get(PHRASE_QUERY_IN_URL_KEY_NAME);

  const searchUserName = searchParams.get(OWNER_NAME_QUERY_IN_URL_KEY_NAME);

  const searchLanguage = valueFromUrlQueryTypeGuard(
    searchParams.get(LANGUAGE_QUERY_IN_URL_KEY_NAME),
    null,
    isValidLanguageQueryInURL
  );

  const apiEndpointQueries: ApiEndpointQueries = {
    page,
    itemsPerPage,
    searchPhrase,
    searchUserName,
    searchLanguage,
  };

  return apiEndpointQueries;
};
