import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useLogoutMutation, useMeQuery, User } from '../generated/graphql';
import { isServer } from '../lib/isServer';

export type DisplayUser = Pick<User, 'email' | 'id' | 'username'>;

function useUser() {
  const router = useRouter();
  const [{ data, fetching: loading, error }, queryMe] = useMeQuery({
    pause: isServer(),
  });

  console.log('useUser', data);

  const [user, setUser] = useState<null | DisplayUser>(null);
  const [{ fetching: loggingOut }, executeLogout] = useLogoutMutation();

  useEffect(() => {
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
