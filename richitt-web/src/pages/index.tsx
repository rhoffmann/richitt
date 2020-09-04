import { Button } from '@chakra-ui/core';
import React from 'react';
import { Layout } from '../components/Layout';
import { useMeQuery } from '../generated/graphql';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [resultMe, reexecuteMe] = useMeQuery();

  const { data, fetching, error } = resultMe;

  const loggedInUser = data?.me;

  async function handleLogout() {
    return true;
  }

  return (
    <Layout>
      {fetching && <div>loading...</div>}
      {error && <div>{error.message}</div>}
      {loggedInUser && (
        <div>
          hello, {loggedInUser.username} ({loggedInUser.email})
        </div>
      )}
      <h2>dashboard</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </Layout>
  );
};

export default Index;
