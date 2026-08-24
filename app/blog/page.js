import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '../../lib/markdown';
import styles from './Blog.module.css';

export const metadata = {
  title: 'Blog & Resources',
  description: 'Compliance insights, payroll tutorials, and HR tech news from yfy.ai.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.blogPage}>
      <div className="container-lg">
        
        <div className={`${styles.hero} reveal`}>
          <h1 className={styles.title}>Resources & Insights</h1>
          <p className={styles.subtitle}>
            Navigate the complexities of Indian labour laws, HR management, and payroll automation with our expert guides.
          </p>
        </div>

        <div className={`${styles.blogGrid} reveal reveal-delay-2`}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.blogCard}>
              {post.category && (
                <span className={styles.categoryTag}>{post.category}</span>
              )}
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardMeta}>
                <span className={styles.author}>{post.author}</span>
                <span className={styles.date}>
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
