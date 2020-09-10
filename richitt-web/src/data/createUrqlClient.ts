import { dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { GRAPHQL_ENDPOINT } from '../config';
import fetch from 'isomorphic-unfetch';
import cacheExchange from './cache';

export const createUrqlClient = (ssrExchange: any) => {
  const clientConfig = {
    exchanges: ssrExchange
      ? [dedupExchange, cacheExchange, ssrExchange, fetchExchange]
      : [dedupExchange, cacheExchange, fetchExchange],
    fetchOptions: {
      credentials: 'include' as const,
    },
    url: GRAPHQL_ENDPOINT,
    fetch,
  };

  return clientConfig;
};
