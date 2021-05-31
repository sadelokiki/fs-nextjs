import PropTypes from 'prop-types';

import { Layout } from '../components/Layout';
import { PostShape } from '../prop-shapes/post';
import { fetchPosts } from '../prisma/helpers/post';

const Journal = ({ posts }) => {
  return (
    <Layout>
      <h1>Posts</h1>
      {/* todo: render posts in a user-friendly way */}
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </Layout>
  );
};

Journal.propTypes = {
  posts: PropTypes.arrayOf(PostShape).isRequired,
};

export const getServerSideProps = async () => {
  return {
    props: {
      posts: await fetchPosts(),
    },
  };
};

export default Journal;
