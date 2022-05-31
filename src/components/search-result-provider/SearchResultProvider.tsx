import { ActionStatus } from "../../@types-and-const/@general";
import { SearchResult } from "../../@types-and-const/search-result";
import createCtx from "../../utilities/createCtx";
import { CustomError } from "../../utilities/customError";
import useDataProvider from "./hooks/useDataProvider";

interface SearchingStatus {
  actionStatus: ActionStatus;
  searchResult: SearchResult | null;
  customError: CustomError;
}

const [useSearchingStatusContext, SearchingStatusContextProvider] =
  createCtx<SearchingStatus>("SearchResultContextProvider");

interface Props {
  children: React.ReactNode;
}

const SearchResultProvider = ({ children }: Props) => {
  const searchingStatus = useDataProvider();

  return (
    <SearchingStatusContextProvider value={searchingStatus}>
      {children}
    </SearchingStatusContextProvider>
  );
};

export default SearchResultProvider;
export { useSearchingStatusContext, SearchingStatusContextProvider };
