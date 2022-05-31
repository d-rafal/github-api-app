export const valueFromUrlQueryTypeGuard = <T, K>(
  valueFromUrlQuery: string | null,
  substituteValue: K,
  validationFunction: (value: any) => value is T
) => {
  let typeGuardValue: T | K = substituteValue;

  if (validationFunction(valueFromUrlQuery)) {
    typeGuardValue = valueFromUrlQuery;
  }

  return typeGuardValue;
};
