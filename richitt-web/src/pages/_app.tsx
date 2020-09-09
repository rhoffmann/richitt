import React from 'react';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';

import theme from '../theme';
import { GRAPHQL_ENDPOINT } from '../config';
import cache from '../data/cache';

const client = createClient({
  url: GRAPHQL_ENDPOINT,
  exchanges: [dedupExchange, cache, fetchExchange],
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
