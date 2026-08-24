import React from 'react';
import { getPostBySlug, getAllPosts } from '../../../lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './BlogPost.module.css';

// Automatically generate SEO tags based on markdown frontmatter
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    }
  };
}

// Statically generate standard routes at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.articlePage}>
      <article className="container-lg">
        
        <header className={styles.articleHeader}>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Resources
          </Link>
          
          <div className="reveal">
            {post.category && (
              <span className={styles.categoryTag}>{post.category}</span>
            )}
            <h1 className={styles.title}>{post.title}</h1>
            
            <div className={styles.meta}>
              <span>By <strong>{post.author}</strong></span>
              <span className={styles.separator}>•</span>
              <span>
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </header>

        <div className={`${styles.articleContent} reveal reveal-delay-2`}>
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

      </article>
    </div>
  );
}
