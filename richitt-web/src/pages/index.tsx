import React from 'react';
import { withUrqlClient } from 'next-urql';

import { Layout } from '../components/Layout';
import { createUrqlClient } from '../data/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import useUser from '../hooks/useUser';

interface IndexProps {
  posts: any[];
}

const Index: React.FC<IndexProps> = ({}) => {
  const { user, loading, error } = useUser();
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      {data?.posts ? (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      ) : (
        <div>loading posts...</div>
      )}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
