import {
  AppBar,
  Link,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import NextLink from "next/link";
import classes from "../utils/classes";

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    // palette: {
    //   mode: darkMode ? "dark" : "light",
    //   primary: {
    //     main: "#f0c000",
    //   },
    //   secondary: {
    //     main: "#208080",
    //   },
    // },
  });

  return (
    <>
      <Head>
        <title>{title ? `${title} - Sanity Amazona` : `Sanity Amazona`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand} variant="h1">
                  amazona
                </Typography>
              </Link>
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container sx={classes.main} component="main">
          {children}
        </Container>
        <Box sx={classes.footer} component="footer">
          <Typography>All rights reserved. Sanity Amazona.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
