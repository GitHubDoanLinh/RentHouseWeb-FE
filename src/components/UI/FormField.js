import TextField from '@mui/material/TextField';
import {
    Checkbox,
    createTheme,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    ThemeProvider
} from "@mui/material";
import {Field, useField} from "formik";

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
                shrink: ({ownerState, theme}) => ({
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
                }
            }
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

        MuiCheckbox: {
            defaultProps: {
                sx: {
                    height: '100%',
                    fontSize: 50,
                    backgroundColor: 'whitesmoke',
                    '&:focus': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: 16, // Kích thước font mong muốn cho CustomCheckboxField
                },
            },
        },


    },
});
export const CustomTextField = ({name, label}) => {
    return (
        <ThemeProvider theme={theme}>
            <Field
                name={name}
                label={label}
                type={"text"}
                as={TextField}
            />
        </ThemeProvider>
    );
};


export const CustomSelectField = ({label, options, name, ...rest}) => {
    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Field
                    as={Select}
                    name={name}
                    {...rest}
                >
                    {options.map((option) => (

                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Field>
                {/*<ErrorMessage name={name} component="div"/>*/}
            </FormControl>
        </ThemeProvider>
    );
};


export const CustomCheckboxField = ({label, defaultChecked,...props}) => {
    const [field] = useField(props);
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                control={<Checkbox defaultChecked={defaultChecked} {...field} {...props} />}
                label={label}
                style={{fontSize: theme.typography.fontSize}}
            />
        </ThemeProvider>
    );
};