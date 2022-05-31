import { CheckValidity } from "../hooks/useFieldValueDependsOnUrlWithValidation";

const checkUserNameFieldValidity: CheckValidity = (value: string | null) => {
  if (!value) {
    return { error: true, errorHint: "Pole wymagane" };
  }

  if (value.indexOf(" ") !== -1) {
    return { error: true, errorHint: "Spacja jest niedozwolona" };
  }

  return { error: false, errorHint: " " };
};

export default checkUserNameFieldValidity;
