import React from 'react';
import { User } from '../generated/graphql';

type PublicUserInfo = Pick<User, 'email' | 'id' | 'username'>;

interface UserInfoProps {
  user: PublicUserInfo;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return <div>Hello, {user.username}</div>;
};

export default UserInfo;
