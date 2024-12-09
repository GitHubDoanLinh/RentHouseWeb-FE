import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

// Khởi tạo theme với cấu hình tuỳ chỉnh
const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                sx: {
                    width: '100%',
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
                shrink: ({ ownerState }) =>
                    ownerState.shrink && {
                        fontSize: '1.5rem !important',
                        top: '0 !important',
                    },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    fontSize: 16,
                },
            },
        },
        MuiSelect: {
            defaultProps: {
                sx: {
                    height: '100%',
                    fontSize: 16,
                    backgroundColor: 'white',
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
    },
});

// Tạo thành phần CustomTextField
export const CustomTextField = ({ name, label }) => {
    return (
        <ThemeProvider theme={theme}>
            <Field
                name={name}
                label={label}
                type="text"
                as={TextField} // Tùy chỉnh thành TextField của MUI
            />
        </ThemeProvider>
    );
};

// Tạo thành phần CustomSelectField
export const CustomSelectField = ({ label, options, name, ...rest }) => {
    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Field
                    as={Select} // Tùy chỉnh thành Select của MUI
                    name={name}
                    {...rest}
                >
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Field>
                <ErrorMessage name={name} component="div" />
            </FormControl>
        </ThemeProvider>
    );
};
