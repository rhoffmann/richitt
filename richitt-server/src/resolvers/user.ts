import { User } from 'entities/User';
import { MyContext } from 'types';
import {
  Resolver,
  Mutation,
  Field,
  InputType,
  Arg,
  Ctx,
  ObjectType,
  Query,
} from 'type-graphql';

import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
@InputType()
class UserRegisterInput extends UsernamePasswordInput {
  @Field(() => String, { nullable: true })
  email?: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session!.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserRegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);

    let errors: FieldError[] = [];

    if (options.username.length <= 2) {
      errors.push({
        field: 'username',
        message: 'username too short, how about more than 2',
      });
    }

    if (options.password.length <= 6) {
      errors.push({
        field: 'password',
        message: 'password is too short, how about more than 6',
      });
    }

    // return with input errors
    if (errors.length) {
      return { errors };
    }

    const user = em.create(User, {
      username: options.username,
      email: options.email,
      password: hashedPassword,
    });

    // return with persist errors
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      // duplicate user error
      console.log(err);
      if (err.code === '23505') {
        errors.push({
          field: 'username',
          message: 'username is already taken',
        });
      } else {
        errors.push({
          field: 'general',
          message: `${err.code || 'unknown'}: ${err.message}`,
        });
      }
      return { errors };
    }

    // logging in after registration
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username,
    });

    if (!user) {
      return {
        errors: [
          { field: 'username', message: 'could not find that username' },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'password is incorrect' }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
