import {
  isValidLanguageQueryInURL,
  LanguageQueryInURL,
  LANGUAGE_QUERY_IN_URL_KEY_NAME,
} from "../../../@types-and-const/@url-queries/@language";
import useValueDependsOnUrl from "../../../hooks/useValueDependsOnUrl";
import { getValueFromUrlQueryTypeGuard } from "../../../utilities/getValueFromUrlQueryTypeGuard";

export type SelectedLanguage = LanguageQueryInURL | "all";

const useSelectedLanguageProvider = (searchParams: URLSearchParams) => {
  const selectedLanguageFromUrl: SelectedLanguage =
    getValueFromUrlQueryTypeGuard(
      searchParams.get(LANGUAGE_QUERY_IN_URL_KEY_NAME),
      "all",
      isValidLanguageQueryInURL
    );

  const [selectedLanguage, setSelectedLanguage] = useValueDependsOnUrl(
    selectedLanguageFromUrl
  );

  return [selectedLanguage, setSelectedLanguage] as const;
};

export default useSelectedLanguageProvider;
