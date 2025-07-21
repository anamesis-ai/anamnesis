import { getPostBySlug, getAllPostsForBuild, type Post } from '@/lib/sanity.client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { BlogPostStructuredData } from '@/components/seo/structured-data'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishDate = new Date(post.publishDate || post._createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'

  return (
    <>
      <BlogPostStructuredData
        title={post.title}
        description={post.body?.map(block => {
          if (block._type === 'block' && block.children) {
            return block.children.map((child: any) => child.text).join('')
          }
          return ''
        }).join(' ').slice(0, 160) || ''}
        publishDate={post.publishDate || post._createdAt}
        author={post.author}
        url={`${baseUrl}/blog/${slug}`}
        tags={post.tags}
      />
      <div className="prose max-w-none">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="mb-4">{post.title}</h1>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <time dateTime={post.publishDate || post._createdAt}>
            {publishDate}
          </time>
          {post.author && (
            <>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <span>By {post.author.name}</span>
              </div>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article content */}
      {post.body && (
        <div className="prose prose-lg max-w-none">
          <PortableText 
            value={post.body}
            components={{
              types: {
                // Custom components for different block types can be added here
              },
              marks: {
                // Custom mark components can be added here
                link: ({ children, value }) => (
                  <a href={value.href} className="text-blue-600 hover:text-blue-800">
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
      )}

      {/* Author bio */}
      {post.author?.bio && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">About the Author</h3>
          <div className="flex items-start space-x-4">
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <div className="prose prose-sm text-gray-600">
                <PortableText value={post.author.bio} />
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPostsForBuild()
  
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = post.body
    ?.map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text)
          .join('')
      }
      return ''
    })
    .join(' ')
    .slice(0, 160)

  const publishDate = post.publishDate || post._createdAt
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'

  return {
    title: post.title,
    description,
    keywords: [...(post.tags || []), 'blog', 'directorium', 'tutorial', 'guide'],
    authors: post.author ? [{ name: post.author.name }] : undefined,
    publishedTime: publishDate,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: publishDate,
      authors: post.author ? [post.author.name] : undefined,
      tags: post.tags,
      images: [
        {
          url: '/og-blog-post.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: ['/og-blog-post.png'],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  }
}

// Enable ISR with revalidation
export const revalidate = 3600 // Revalidate every hour