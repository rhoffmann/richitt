import React from 'react';

import { Layout } from '../components/Layout';
import { usePostsQuery } from '../generated/graphql';
import useUser from '../hooks/useUser';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const { user, loading, error } = useUser();

  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      {data ? (
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

// export async function getStaticProps(ctx: NextPageContext) {
//   console.log('ssp', ctx)
//   return {
//     props: {}
//   }
// }

export default Index;
