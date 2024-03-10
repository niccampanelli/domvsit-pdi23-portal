import { createTheme } from "@mui/material"
import { color } from "framer-motion"

const theme = createTheme({
    typography: {
        fontFamily: "Inter, sans-serif"
    },
    components: {
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
        }
    }
})

export default theme