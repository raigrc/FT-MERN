import { useMemo } from "react";

export const options = (
  dependency: string | number | undefined,
  options?: {},
) =>
  useMemo(() => {
    return options ? options : {};
  }, [dependency]);
