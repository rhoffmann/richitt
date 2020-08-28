import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";

import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const port = process.env.PORT || 4000;

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
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
