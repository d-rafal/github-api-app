import * as React from "react";
import { CustomError } from "./customError";

function createCtx<A>(displayName: string) {
  const ctx = React.createContext<A | null>(null);
  ctx.displayName = displayName;
  function useCtx(): A | never {
    const c = React.useContext(ctx);
    if (!c)
      throw new CustomError("useCtx must be inside a Provider with a value!");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export default createCtx;
