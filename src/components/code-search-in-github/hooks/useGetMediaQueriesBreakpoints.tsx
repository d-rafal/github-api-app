import { useMediaQuery, useTheme } from "@mui/material";

const useGetMediaQueriesBreakpoints = () => {
  const theme = useTheme();
  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true,
  });

  return [matchUpSm, matchUpMd] as const;
};

export default useGetMediaQueriesBreakpoints;
