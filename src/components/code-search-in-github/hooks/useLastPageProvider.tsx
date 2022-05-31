import { useSearchingStatusContext } from "../../search-result-provider/SearchResultProvider";

const useLastPageProvider = (currentPage: number) => {
  const searchingStatus = useSearchingStatusContext();

  let lastPage = searchingStatus.searchResult?.lastPage;

  if (!lastPage) {
    lastPage = currentPage;
  }

  return lastPage;
};

export default useLastPageProvider;
