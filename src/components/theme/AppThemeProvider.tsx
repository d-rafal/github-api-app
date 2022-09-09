import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Localization, enUS } from "@mui/material/locale";
import createCtx from "../../utilities/createCtx";

declare module "@mui/material/styles" {
  interface Palette {
    linkStatus: Palette["primary"];
  }
  interface PaletteOptions {
    linkStatus: PaletteOptions["primary"];
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  spacing: (factor: number) => `${0.25 * factor}rem`, // Bootstrap strategy
  palette: {
    mode,
    ...(mode === "light"
      ? {
          linkStatus: {
            main: "red",
          },
        }
      : {
          linkStatus: {
            main: "green",
          },
        }),
  },
});

const [useInversePaletteModeContext, InversePaletteModeContextProvider] =
  createCtx<() => void>("InversePaletteModeContextProvider");

interface ChangeLocalizationContext {
  locale: Localization;
  setLocale: React.Dispatch<React.SetStateAction<Localization>>;
}
const [useChangeLocalizationContext, ChangeLocalizationContextProvider] =
  createCtx<ChangeLocalizationContext>("ChangeLocalizationContextProvider");

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  const [paletteMode, setPaletteMode] = useState<PaletteMode>(() =>
    prefersDarkMode ? "dark" : "light"
  );
  const [locale, setLocale] = useState<Localization>(enUS);

  const theme = responsiveFontSizes(
    createTheme(getDesignTokens(paletteMode), locale)
  );

  const inversePaletteMode = () =>
    setPaletteMode((paletteMode) =>
      paletteMode === "light" ? "dark" : "light"
    );

  return (
    <InversePaletteModeContextProvider value={inversePaletteMode}>
      <ChangeLocalizationContextProvider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ChangeLocalizationContextProvider>
    </InversePaletteModeContextProvider>
  );
};

export default AppThemeProvider;
export { useInversePaletteModeContext, useChangeLocalizationContext };
