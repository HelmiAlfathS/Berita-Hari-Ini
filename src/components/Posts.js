import React from 'react';

const Posts = ({ post, loading }) => {
  if (loading) {
    return <h2>loading . . .</h2>;
  }
  return (
    <div>
      <h3>Random Post </h3>
      <ul class="list-group">
        {post.map((post) => (
          <li class="list-group-item" key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
