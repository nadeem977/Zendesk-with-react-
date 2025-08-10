const PostsList =({ posts })=> {
  return (
    <div className="card">
      <div className="card-header"><h3>Last 3 Posts</h3></div>
      <div className="card-body">
        {posts.length ? (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="post-title"
                title={post.title}
              >
                {post.title.length > 60 ? post.title.substring(0, 57) + "..." : post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent posts found.</p>
        )}
      </div>
    </div>
  );
}

export default PostsList;