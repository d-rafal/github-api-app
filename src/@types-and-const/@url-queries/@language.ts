type JavaScript = "javascript";
type TypeScript = "typescript";

export const JAVASCRIPT: JavaScript = "javascript";
export const TYPESCRIPT: TypeScript = "typescript";

// !!!!! adequate changes must also be made in "isValidLanguageQueryInURL" type predicate function !!!!!
export type LanguageQueryInURL = JavaScript | TypeScript;

export function isValidLanguageQueryInURL(
  languageQuery: any
): languageQuery is LanguageQueryInURL {
  if (!languageQuery || typeof languageQuery !== "string") {
    return false;
  }

  return languageQuery === JAVASCRIPT || languageQuery === TYPESCRIPT;
}

export type LanguageQueryInUrlKayName = "language";
export const LANGUAGE_QUERY_IN_URL_KEY_NAME: LanguageQueryInUrlKayName =
  "language";
