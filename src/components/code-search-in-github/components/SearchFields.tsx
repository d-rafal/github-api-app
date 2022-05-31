import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  JAVASCRIPT,
  TYPESCRIPT,
} from "../../../@types-and-const/@url-queries/@language";
import { PHRASE_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@phrase";
import { OWNER_NAME_QUERY_IN_URL_KEY_NAME } from "../../../@types-and-const/@url-queries/@user-name";
import useFieldValueDependsOnUrlWithValidation from "../hooks/useFieldValueDependsOnUrlWithValidation";
import useGetMediaQueriesBreakpoints from "../hooks/useGetMediaQueriesBreakpoints";
import useOnSubmitProvider from "../hooks/useOnSubmitProvider";
import useSelectedLanguageProvider, {
  SelectedLanguage,
} from "../hooks/useSelectedLanguageProvider";
import checkPraseFieldValidity from "../utilities/checkPraseFieldValidity";
import checkUserNameFieldValidity from "../utilities/checkUserNameFieldValidity";

const SearchFields = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [matchUpSm, matchUpMd] = useGetMediaQueriesBreakpoints();

  const phraseField = useFieldValueDependsOnUrlWithValidation(
    searchParams.get(PHRASE_QUERY_IN_URL_KEY_NAME),
    checkPraseFieldValidity
  );

  const ownerField = useFieldValueDependsOnUrlWithValidation(
    searchParams.get(OWNER_NAME_QUERY_IN_URL_KEY_NAME),
    checkUserNameFieldValidity
  );

  const [selectedLanguage, setSelectedLanguage] =
    useSelectedLanguageProvider(searchParams);

  const onSubmit = useOnSubmitProvider(
    phraseField.value,
    phraseField.isValid,
    ownerField.value,
    ownerField.isValid,
    selectedLanguage,
    searchParams,
    setSearchParams
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack
        direction={matchUpSm ? "row" : "column"}
        alignItems={matchUpSm ? "start" : "center"}
        justifyContent={matchUpMd ? "start" : "center"}
        spacing={matchUpSm ? 5 : 2}
        sx={{
          flexWrap: "wrap",
        }}
      >
        <TextField
          id="phrase"
          name="phrase"
          margin="normal"
          required
          label="szukana fraza"
          type="search"
          autoFocus
          helperText={phraseField.validationStatus.errorHint}
          error={phraseField.validationStatus.error}
          value={phraseField.value ?? ""}
          onChange={phraseField.handleOnChangeValue}
          onBlur={phraseField.handleOnBlur}
          sx={{ margin: "0" }}
        />
        <TextField
          id="owner-name"
          name="owner-name"
          margin="normal"
          required
          label="nazwa właściciela"
          type="search"
          helperText={ownerField.validationStatus.errorHint}
          error={ownerField.validationStatus.error}
          value={ownerField.value}
          onChange={ownerField.handleOnChangeValue}
          onBlur={ownerField.handleOnBlur}
          sx={{ margin: "0" }}
        />
        <FormControl sx={{ minWidth: "9rem" }}>
          <InputLabel id="programming-language-label">
            Język Programowania
          </InputLabel>
          <Select
            labelId="programming-language-label"
            id="programming-language"
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(e.target.value as SelectedLanguage)
            }
            label="Język Programowania"
            autoWidth
          >
            <MenuItem value="all">Wszystkie</MenuItem>
            <MenuItem value={TYPESCRIPT}>TypeScript</MenuItem>
            <MenuItem value={JAVASCRIPT}>JavaScript</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          size="large"
          variant="outlined"
          sx={{ marginTop: { xs: "1.5rem!important", sm: "0.5rem!important" } }}
        >
          Szukaj
        </Button>
      </Stack>
    </form>
  );
};

export default SearchFields;
