import { CheckValidity } from "../hooks/useFieldValueDependsOnUrlWithValidation";

const checkPraseFieldValidity: CheckValidity = (value: string | null) => {
  if (!value) {
    return { error: true, errorHint: "Pole wymagane" };
  }

  return { error: false, errorHint: " " };
};

export default checkPraseFieldValidity;
