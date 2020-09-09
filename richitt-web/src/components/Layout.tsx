import { Box } from '@chakra-ui/core';
import React from 'react';
import { NavBar } from './NavBar';

interface LayoutProps {
  variant?: 'small' | 'regular';
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = 'regular',
}) => {
  const maxW = variant === 'regular' ? '800px' : '400px';

  return (
    <Box>
      <NavBar />
      <Box maxW={maxW} w="100%" mt="8" mx="auto">
        {children}
      </Box>
    </Box>
  );
};
