import { SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { SetSearchParams } from "../../../@types-and-const/@general";
import {
  DEFAULT_ITEMS_PER_PAGE,
  isValidItemsPerPageQueryInURL,
  ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME,
} from "../../../@types-and-const/@url-queries/@items-per-page";
import { PAGE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@page";
import { valueFromUrlQueryTypeGuard } from "../../../utilities/valueFromUrlQueryTypeGuard";

const useItemsPerPageProvider = (
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParams
) => {
  const itemsPerPage = valueFromUrlQueryTypeGuard(
    searchParams.get(ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME),
    DEFAULT_ITEMS_PER_PAGE,
    isValidItemsPerPageQueryInURL
  );

  const setItemsPerPage = useCallback(
    (e: SelectChangeEvent<any>) => {
      const newSearchInstance = new URLSearchParams(searchParams);

      newSearchInstance.set(
        ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME,
        e.target.value
      );

      newSearchInstance.set(PAGE_QUERY_IN_URL_KEY_NAME, "1");

      setSearchParams(newSearchInstance);
    },
    [searchParams, setSearchParams]
  );

  return [itemsPerPage, setItemsPerPage] as const;
};

export default useItemsPerPageProvider;
