import { RetrieveArrayElementType } from "./@general";

export interface SearchResult {
  lastPage: number | null;
  items: {
    file: {
      name: string;
      url: string;
    };
    repoDescription: string;
    owner: {
      login: string;
      avatarUrl: string;
    };
  }[];
}

export type FoundItem = RetrieveArrayElementType<SearchResult["items"]>;

export const BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER =
  "Błędna odpowiedz z serwera, brak danych do wyświetlenia!";
