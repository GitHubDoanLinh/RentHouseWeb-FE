import React from "react";
import { Field, useField } from "formik";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
const CustomTextField = ({ name, label }) => {
  // const [field, meta] = useField(props);
  const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          sx: {
            width: "100%",
            fontSize: 14,
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          sx: {
            fontSize: 14,
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          sx: {
            fontSize: 14,
          },
        },
        styleOverrides: {
          shrink: ({ ownerState, theme }) => ({
            ...(ownerState.shrink && {
              fontSize: "1.5rem !important",
              top: "0 !important",
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          sx: {
            fontSize: 16,
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TextField name={name} label={label} type={"text"} />
    </ThemeProvider>
  );
};
export default CustomTextField;
