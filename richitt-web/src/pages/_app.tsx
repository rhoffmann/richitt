import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from '../theme';

// import { Provider, createClient } from 'urql';
// const client = createClient(createUrqlClient(null));

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
