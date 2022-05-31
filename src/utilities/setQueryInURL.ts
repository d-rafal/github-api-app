import { SetSearchParams } from "../@types-and-const/@general";

/**
 * This function updates url query using passed setSearchParams method returned by useSearchParams hook from react-router, if last argument (queryValue)
 * is not provided or equal to empty string, the query will be deleted from url.
 *
 * @param searchParams - URLSearchParams instance
 * @param setSearchParams - method returned by useSearchParams hook from react-router
 * @param queryKey - query key
 * @param queryValue - query value, if not provided or empty string, the query will be deleted from url
 * @returns void
 */
export const setQueryInURL = <T extends string, K extends string>(
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParams,
  queryKey: T,
  queryValue?: K
) => {
  const newSearchParamsInstance = new URLSearchParams(searchParams);

  if (!queryValue) {
    newSearchParamsInstance.delete(queryKey);
  } else {
    newSearchParamsInstance.set(queryKey, queryValue);
  }

  setSearchParams(newSearchParamsInstance);
};
