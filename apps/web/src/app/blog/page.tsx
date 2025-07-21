import { getAllPosts, type Post } from '@/lib/sanity.client'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="prose max-w-none">
      <h1>Blog</h1>
      
      <p>
        Discover insights, tutorials, and updates from the Directorium team. 
        Stay informed about platform updates, best practices, and industry trends.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
          <p className="text-gray-400 text-sm mt-2">
            Posts will appear here once they're published in the CMS.
          </p>
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  const publishDate = new Date(post.publishDate || post._createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Extract plain text from body for excerpt
  const excerpt = post.body
    ?.map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text)
          .join('')
      }
      return ''
    })
    .join(' ')
    .slice(0, 200) + '...'

  return (
    <article className="border-b border-gray-200 pb-8">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <time dateTime={post.publishDate || post._createdAt}>
            {publishDate}
          </time>
          {post.author && (
            <>
              <span>•</span>
              <span>By {post.author.name}</span>
            </>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          <Link 
            href={`/blog/${post.slug.current}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        {excerpt && (
          <p className="text-gray-600 leading-relaxed">
            {excerpt}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
        
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}

// Generate metadata for SEO
export const metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the Directorium platform team. Stay informed about platform updates, best practices, and industry trends.',
  keywords: ['blog', 'insights', 'tutorials', 'updates', 'platform', 'directorium', 'technology', 'documentation'],
  openGraph: {
    title: 'Blog - Directorium',
    description: 'Insights, tutorials, and updates from the Directorium platform team.',
    type: 'website',
    images: ['/og-blog.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Directorium',
    description: 'Insights, tutorials, and updates from the Directorium platform team.',
    images: ['/og-blog.png'],
  },
  alternates: {
    canonical: '/blog',
  },
}

// Enable ISR with revalidation
export const revalidate = 3600 // Revalidate every hour