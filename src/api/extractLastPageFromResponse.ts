import tryConvertToFiniteNumberNullAsZero from "../utilities/tryConvertToFiniteNumberNullAsZero";

/**
 * This function tries to retrieves last page number from link header in response from github api, if operation is not successful, returns null
 *
 * @param res - response from github api
 * @returns last page or null
 */
const extractLastPageFromResponse = (res: Response) => {
  let lastPage = null;
  const linkHeader = res.headers.get("link");

  if (linkHeader) {
    const match = linkHeader.match(/<.*(?<!per_)page=([^&]+).*?>; rel="last"/);

    lastPage = tryConvertToFiniteNumberNullAsZero(match?.[1]);
  }

  return lastPage;
};
export default extractLastPageFromResponse;
