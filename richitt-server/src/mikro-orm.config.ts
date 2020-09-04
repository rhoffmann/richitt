import { Post } from './entities/Post';
import { User } from './entities/User';
import { __prod__, DB_NAME, DB_USER, DB_PASSWORD } from './constants';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  debug: !__prod__,
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
