import React from 'react';
import { User } from '../generated/graphql';

type PublicUserInfo = Pick<User, 'email' | 'id' | 'username'>;

interface UserInfoProps {
  user: PublicUserInfo;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  // const [logout, queryLogout] = useLogoutMutation();
  return (
    <div>
      Hello, {user.username} {user.email && `with email ${user.email}`}
    </div>
  );
};

export default UserInfo;
