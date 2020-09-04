import React from 'react';
import { MeQuery, User } from '../generated/graphql';

type PublicUserInfo = Pick<User, 'email' | 'id' | 'username'>;

interface UserInfoProps {
  user: PublicUserInfo;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      Hello, {user.username} {user.email && `with email ${user.email}`}
    </div>
  );
};

export default UserInfo;
