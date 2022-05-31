import { useCallback, useEffect, useState } from "react";
import useValueDependsOnUrl from "../../../hooks/useValueDependsOnUrl";

interface ValidationStatus {
  error: boolean;
  errorHint: string;
}

export interface CheckValidity {
  (value: string | null): ValidationStatus;
}

export interface Validate {
  (): boolean;
}

const useFieldValueDependsOnUrlWithValidation = (
  valueInUrl: string | null,
  checkValidity: CheckValidity
) => {
  const [value, setValue] = useValueDependsOnUrl<string>(valueInUrl ?? "");
  const [dirty, setDirty] = useState(() =>
    valueInUrl !== null ? true : false
  );

  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
    error: false,
    errorHint: " ",
  });

  const isValid: Validate = useCallback(() => {
    const validationResult = checkValidity(value);

    setValidationStatus(validationResult);
    setDirty(true);

    if (!validationResult.error) {
      return true;
    } else {
      return false;
    }
  }, [value, checkValidity]);

  useEffect(() => {
    if (dirty) {
      isValid();
    }
  }, [dirty, isValid]);

  const handleOnChangeValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const handleOnBlur = useCallback(() => {
    if (!dirty) {
      setDirty(true);
    }
  }, [dirty]);

  return {
    value,
    isValid,
    validationStatus,
    handleOnChangeValue,
    handleOnBlur,
  };
};

export default useFieldValueDependsOnUrlWithValidation;
