import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/core';
import Link from 'next/link';

import useUser from '../hooks/useUser';
import UserInfo from './UserInfo';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const { user, logout } = useUser();

  function handleLogout() {
    logout();
  }

  return (
    <Flex p={4} bg="orange.200" alignItems="center">
      <Box>Welcome to Richitt</Box>
      {user ? (
        <>
          <Box ml="auto">
            <Flex alignItems="center">
              <Box mr={6}>
                <UserInfo user={user} />
              </Box>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          </Box>
        </>
      ) : (
        <>
          <Box ml="auto">
            <Link href="/register">
              <Button mr={3}>Register</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </Box>
        </>
      )}
    </Flex>
  );
};
