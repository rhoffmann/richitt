import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterUserMutation,
} from '../generated/graphql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';

export function improvedUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}

const cache = cacheExchange({
  updates: {
    Mutation: {
      login: (_result, args, cache, info) => {
        improvedUpdateQuery<LoginMutation, MeQuery>(
          cache,
          {
            query: MeDocument,
          },
          _result,
          (result, query) => {
            if (result.login.errors) {
              return query;
            } else {
              return {
                me: result.login.user,
              };
            }
          }
        );
      },
      logout: (_result, args, cache, info) => {
        improvedUpdateQuery<LogoutMutation, MeQuery>(
          cache,
          {
            query: MeDocument,
          },
          _result,
          () => ({ me: null })
        );
      },
      register: (_result, args, cache, info) => {
        improvedUpdateQuery<RegisterUserMutation, MeQuery>(
          cache,
          {
            query: MeDocument,
          },
          _result,
          (result, query) => {
            if (result.register.errors) {
              return query;
            } else {
              return {
                me: result.register.user,
              };
            }
          }
        );
      },
    },
  },
});

export default cache;
