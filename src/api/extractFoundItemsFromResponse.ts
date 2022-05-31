import {
  BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER,
  FoundItem,
} from "../@types-and-const/search-result";
import { CustomError } from "../utilities/customError";

export const extractFoundItems = (data: any): never | FoundItem[] => {
  const foundItems: FoundItem[] = [];

  try {
    data.items.forEach((item: any) => {
      foundItems.push({
        file: {
          name: String(item.name ?? ""),
          url: String(item.html_url ?? ""),
        },
        repoDescription: String(item.repository.description ?? ""),
        owner: {
          login: String(item.repository.owner.login ?? ""),
          avatarUrl: String(item.repository.owner.avatar_url ?? ""),
        },
      });
    });

    return foundItems;
  } catch (error) {
    throw new CustomError(
      (error as Error).message,
      BAD_RESPONSE_FROM_SERVER_MESSAGE_FOR_USER
    );
  }
};
