import { useSearchParams } from "react-router-dom";

export type ActionStatus =
  | "PROCESSING"
  | "FAILED"
  | "SUCCEEDED"
  | "INITIAL_STATE";

export type RetrieveArrayElementType<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type SetSearchParams = ReturnType<typeof useSearchParams>[1];
