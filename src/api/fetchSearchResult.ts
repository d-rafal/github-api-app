import { ItemsPerPageQueryInURL } from "../@types-and-const/@url-queries/@items-per-page";
import { LanguageQueryInURL } from "../@types-and-const/@url-queries/@language";
import {
  BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER,
  SearchResult,
} from "../@types-and-const/search-result";
import { AppException } from "../utilities/appException";
import { extractFoundItems as extractFoundItemsFromResponse } from "./extractFoundItemsFromResponse";
import extractLastPageFromResponse from "./extractLastPageFromResponse";
import { prepareQueryString } from "./prepareQueryString";

export interface ApiEndpointQueries {
  page: number;
  itemsPerPage: ItemsPerPageQueryInURL;
  searchPhrase: string | null;
  searchUserName: string | null;
  searchLanguage: LanguageQueryInURL | null;
}

export const fetchSearchResult = async (
  apiEndpointQueries: ApiEndpointQueries,
  abortController?: AbortController
) => {
  try {
    const queryString = prepareQueryString(apiEndpointQueries);

    const fetchOptions: RequestInit = {
      headers: {
        // Accept: "application/vnd.github.v3+json",
        Accept: "application/vnd.github.v3.text-match+json",
      },
      ...(abortController ? { signal: abortController.signal } : null),
    };

    const res = await fetch("/search/code" + queryString, fetchOptions);

    if (res.status === 422) {
      throw new AppException(
        `HTTP error! status: ${res.status}`,
        "Nie ma takiego użytkownika w serwise GitHub."
      );
    }

    if (res.status === 403) {
      throw new AppException(
        `HTTP error! status: ${res.status}`,
        "Przekroczono limit zapytań do serwera, spróbuj ponownie za jakiś czas."
      );
    }

    if (!res.ok) {
      throw new AppException(
        `HTTP error! status: ${res.status}`,
        BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER
      );
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new AppException(
        "Response not in JSON format!",
        BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER
      );
    }

    const data = await res.json();

    const lastPage = extractLastPageFromResponse(res);

    const foundItems = extractFoundItemsFromResponse(data);

    const searchResult: SearchResult = { items: foundItems, lastPage };

    return searchResult;
  } catch (error) {
    return Promise.reject(error);
  }
};
