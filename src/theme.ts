import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const breakpoints = {
  base: "0px",
  sm: "900px",
  md: "900px",
  lg: "1024px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({ config, breakpoints })

export default theme