import { createTheme } from "@mui/material"

const theme = createTheme({
    typography: {
        fontFamily: "Inter, sans-serif"
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                input: {
                    paddingLeft: "0px !important"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                color: "primary",
                variant: "contained",
                size: "large"
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover, &:focus': {
                        boxShadow: 'none'
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    '&::placeholder': {
                        color: theme.palette.text.secondary
                    }
                })
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main
                })
            }
        },
        MuiFab: {
            defaultProps: {
                color: "primary",
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontWeight: 600
                }
            }
        }
    }
})

export default theme