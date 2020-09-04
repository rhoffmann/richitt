import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field } from 'type-graphql';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryKey({ type: 'text' })
  id = v4();

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: 'text' })
  email: string;

  @Property({ type: 'text' })
  password!: string;
}
