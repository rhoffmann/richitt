import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/core';
import Link from 'next/link';

import useUser from '../hooks/useUser';
import UserInfo from './UserInfo';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const { user, logout } = useUser();

  async function handleLogout() {
    logout();
  }

  return (
    <Flex p={4} bg="tomato">
      {user ? (
        <>
          <Box>
            <UserInfo user={user} />
          </Box>
          <Box ml="auto">
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </>
      ) : (
        <>
          <Box>Welcome to Richitt</Box>
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
