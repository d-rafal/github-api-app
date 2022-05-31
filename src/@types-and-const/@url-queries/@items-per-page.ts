const AVAILABLE_ITEMS_PER_PAGE = ["25", "50", "75", "100"] as const;
export const ITEMS_PER_PAGE_25: typeof AVAILABLE_ITEMS_PER_PAGE[0] = "25";
export const ITEMS_PER_PAGE_50: typeof AVAILABLE_ITEMS_PER_PAGE[1] = "50";
export const ITEMS_PER_PAGE_75: typeof AVAILABLE_ITEMS_PER_PAGE[2] = "75";
export const ITEMS_PER_PAGE_100: typeof AVAILABLE_ITEMS_PER_PAGE[3] = "100";

export type ItemsPerPageQueryInURL = typeof AVAILABLE_ITEMS_PER_PAGE[number];

export const DEFAULT_ITEMS_PER_PAGE: ItemsPerPageQueryInURL = "25";

export const isValidItemsPerPageQueryInURL = (
  itemsPerPage: any
): itemsPerPage is ItemsPerPageQueryInURL =>
  AVAILABLE_ITEMS_PER_PAGE.find((element) => element === itemsPerPage) !==
  undefined;

export type ItemsPerPageQueryInUrlKayName = "items";
export const ITEMS_PER_PAGE_QUERY_IN_URL_KEY_NAME: ItemsPerPageQueryInUrlKayName =
  "items";
