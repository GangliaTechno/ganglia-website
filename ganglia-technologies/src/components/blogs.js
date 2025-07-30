import React from "react";
import "../styles/blogs.css";

function Blogs() {
  // Empty array to show "no blogs available" state
  const blogPosts = [];

  return (
    <div>
      <section className="blogs-section">
        <h2 className="blogs-title">Latest Blogs</h2>
        <div className="blogs-grid">
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
              <article key={index} className="blog-card">
                <a href={post.url} className="blog-image-link" aria-label={`Read more: ${post.title}`}>
                  <img src={post.imageUrl} alt={post.title} className="blog-image" />
                </a>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <div className="blog-meta">
                    <time className="blog-date">{post.date}</time>
                    <span className="blog-author">by {post.author}</span>
                  </div>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href={post.url} className="blog-read-more" aria-label={`Read full blog: ${post.title}`}>
                    Read More →
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="no-blogs-message">
              <div className="no-blogs-icon">📝</div>
              <h3>No Blogs Available</h3>
              <p>We're working on bringing you amazing content. Check back soon for the latest insights and updates!</p>
            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}

export default Blogs;
