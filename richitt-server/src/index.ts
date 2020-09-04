import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroORMConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';

import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { REDIS_SECRET, SESSION_COOKIE_NAME, __prod__ } from './constants';
import { MyContext } from 'types';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const port = process.env.PORT || 4000;

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        // disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // only on https (prod)
      },
      saveUninitialized: false,
      secret: REDIS_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      em: orm.em,
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`server started on localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
