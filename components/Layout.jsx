import { Store } from "../utils/Store";
import {
  AppBar,
  Link,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  Container,
  Box,
  Switch,
  Badge,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import jsCookie from "js-cookie";
import Head from "next/head";
import NextLink from "next/link";
import { useContext } from "react";
import classes from "../utils/classes";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

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
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    jsCookie.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

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
            <Box display="flex" alignItems="center">
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand} variant="h1">
                    amazona
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <Switch checked={darkMode} onChange={darkModeChangeHandler} />
              <NextLink href="cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <NextLink href="/profile" passHref>
                  <Link>{userInfo.name}</Link>
                </NextLink>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </Box>
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
