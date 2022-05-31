import { useCallback } from "react";
import { SetSearchParams } from "../../../@types-and-const/@general";
import { LANGUAGE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@language";
import { PHRASE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@phrase";
import { OWNER_NAME_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@user-name";
import { Validate } from "./useFieldValueDependsOnUrlWithValidation";
import { SelectedLanguage } from "./useSelectedLanguageProvider";

const useOnSubmitProvider = (
  phraseValue: string | null,
  isPhraseValid: Validate,
  userNameValue: string | null,
  isUserNameValid: Validate,
  selectedLanguage: SelectedLanguage,
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParams
) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const phraseValid = isPhraseValid();
      const userNameValid = isUserNameValid();

      if (phraseValid && userNameValid) {
        const newSearchParamsInstance = new URLSearchParams(searchParams);

        newSearchParamsInstance.set(
          PHRASE_QUERY_IN_URL_KEY_NAME,
          phraseValue as string
        );

        newSearchParamsInstance.set(
          OWNER_NAME_QUERY_IN_URL_KEY_NAME,
          userNameValue as string
        );

        if (!selectedLanguage || selectedLanguage === "all") {
          newSearchParamsInstance.delete(LANGUAGE_QUERY_IN_URL_KEY_NAME);
        } else {
          newSearchParamsInstance.set(
            LANGUAGE_QUERY_IN_URL_KEY_NAME,
            selectedLanguage
          );
        }

        setSearchParams(newSearchParamsInstance);
      }
    },
    [
      phraseValue,
      isPhraseValid,
      userNameValue,
      isUserNameValid,
      searchParams,
      setSearchParams,
      selectedLanguage,
    ]
  );

  return onSubmit;
};

export default useOnSubmitProvider;
