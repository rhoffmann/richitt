import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'urql';
import { LogoutDocument, useMeQuery, User } from '../generated/graphql';

export type DisplayUser = Pick<User, 'email' | 'id' | 'username'>;

function useUser() {
  const router = useRouter();
  const [me] = useMeQuery();
  const [user, setUser] = useState<null | DisplayUser>(null);
  const [, executeLogout] = useMutation(LogoutDocument);

  const { data, fetching, error } = me;

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [fetching]);

  const logout = useCallback(async () => {
    await executeLogout();
    router.push('/');
  }, [executeLogout]);

  return {
    user,
    fetching,
    error,
    logout,
  };
}

export default useUser;
