import React from 'react';
import { Layout } from '../components/Layout';
import { NavBar } from '../components/NavBar';
import useUser from '../hooks/useUser';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const { user, fetching, error } = useUser();

  return (
    <Layout>
      {user ? (
        <>
          <h2>dashboard</h2>
        </>
      ) : (
        <>
          <h2>nope</h2>
        </>
      )}
    </Layout>
  );
};

export default Index;
