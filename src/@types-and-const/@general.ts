import { useSearchParams } from "react-router-dom";

export type ReportedExceptionCharacterType = "error" | "warning" | "info";
export interface ReportedException {
  messageForUser: string;
  type: ReportedExceptionCharacterType;
}

export type ActionStatus =
  | { status: "INITIAL_STATE" | "PROCESSING" | "SUCCEEDED" }
  | {
      status: "FAILED";
      reportedException: ReportedException;
    };

export type RetrieveArrayElementType<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type SetSearchParams = ReturnType<typeof useSearchParams>[1];
