import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";
import { PAGE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@page";
import useItemsPerPageProvider from "../hooks/useItemsPerPageProvider";
import {
  ITEMS_PER_PAGE_100,
  ITEMS_PER_PAGE_25,
  ITEMS_PER_PAGE_50,
  ITEMS_PER_PAGE_75,
} from "../../../@types-and-const/@url-queries/@items-per-page";
import useCurrentPageProvider from "../hooks/useCurrentPageProvider";
import useLastPageProvider from "../hooks/useLastPageProvider";

const NavigationSection = () => {
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useCurrentPageProvider(searchParams);
  const lastPage = useLastPageProvider(currentPage);

  const [itemsPerPage, setItemsPerPage] = useItemsPerPageProvider(
    searchParams,
    setSearchParams
  );

  const newSearchParamsInstance = new URLSearchParams(searchParams);

  return (
    <Box component="section" sx={{ marginBottom: "2rem" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Pagination
          size={matchUpSm ? "large" : "small"}
          page={currentPage}
          count={lastPage ? lastPage : 1}
          color="primary"
          siblingCount={1}
          renderItem={(params) => {
            newSearchParamsInstance.set(
              PAGE_QUERY_IN_URL_KEY_NAME,
              String(params.page)
            );
            return (
              <PaginationItem
                {...params}
                component={Link}
                to={"?" + newSearchParamsInstance.toString()}
              />
            );
          }}
        />
        <FormControl variant="standard" sx={{ m: 0, minWidth: "6rem" }}>
          <InputLabel id="nr-of-items-on-page-label">
            Ilość elementów
          </InputLabel>
          <Select
            labelId="nr-of-items-on-page-label"
            id="nr-of-items-on-page"
            value={itemsPerPage}
            onChange={setItemsPerPage}
            label="Ilość elementów"
            autoWidth
          >
            <MenuItem value={ITEMS_PER_PAGE_25}>{ITEMS_PER_PAGE_25}</MenuItem>
            <MenuItem value={ITEMS_PER_PAGE_50}>{ITEMS_PER_PAGE_50}</MenuItem>
            <MenuItem value={ITEMS_PER_PAGE_75}>{ITEMS_PER_PAGE_75}</MenuItem>
            <MenuItem value={ITEMS_PER_PAGE_100}>{ITEMS_PER_PAGE_100}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default NavigationSection;
