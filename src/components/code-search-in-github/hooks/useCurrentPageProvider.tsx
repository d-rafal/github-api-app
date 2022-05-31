import { PAGE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@page";
import tryConvertToFiniteNumber from "../../../utilities/tryConvertToFiniteNumber";

const useCurrentPageProvider = (searchParams: URLSearchParams) => {
  let currentPage = tryConvertToFiniteNumber(
    searchParams.get(PAGE_QUERY_IN_URL_KEY_NAME)
  );
  if (currentPage === null || currentPage <= 0) currentPage = 1;

  return currentPage;
};

export default useCurrentPageProvider;
