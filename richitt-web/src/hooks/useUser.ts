import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'urql';
import {
  // LogoutDocument,
  useLogoutMutation,
  useMeQuery,
  User,
} from '../generated/graphql';

export type DisplayUser = Pick<User, 'email' | 'id' | 'username'>;

function useUser() {
  const router = useRouter();
  const [{ data, fetching: loading, error }, queryMe] = useMeQuery();
  const [user, setUser] = useState<null | DisplayUser>(null);
  const [{ fetching: loggingOut }, executeLogout] = useLogoutMutation();

  useEffect(() => {
    console.log('user changed', data?.me);
    setUser(data?.me || null);
  }, [data]);

  const logout = useCallback(async () => {
    await executeLogout();
    router.push('/');
  }, [executeLogout]);

  return {
    user,
    loading,
    error,
    loggingOut,
    logout,
  };
}

export default useUser;
