import { ActionStatus } from "../../@types-and-const/@general";
import { SearchResult } from "../../@types-and-const/search-result";
import createCtx from "../../utilities/createCtx";
import useDataProvider from "./hooks/useDataProvider";

interface SearchingStatus {
  actionStatus: ActionStatus;
  searchResult: SearchResult | null;
}

const [useSearchingStatusContext, SearchingStatusContextProvider] =
  createCtx<SearchingStatus>("SearchingStatusContextProvider");

interface Props {
  children: React.ReactNode;
}

const SearchingStatusProvider = ({ children }: Props) => {
  const searchingStatus = useDataProvider();

  return (
    <SearchingStatusContextProvider value={searchingStatus}>
      {children}
    </SearchingStatusContextProvider>
  );
};

export default SearchingStatusProvider;
export { useSearchingStatusContext, SearchingStatusContextProvider };
