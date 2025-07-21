import { draftMode } from 'next/headers'
import { sanityFetch } from '@/lib/sanity'
import { SanityLive } from '@/lib/sanity'

const POSTS_QUERY = `*[_type == "post"] | order(publishDate desc) {
  _id,
  title,
  slug,
  publishDate,
  author->{name},
  tags
}`

export default async function PostsPage() {
  const { isEnabled: isDraftMode } = draftMode()
  
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    perspective: isDraftMode ? 'previewDrafts' : 'published',
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {isDraftMode && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <strong>Draft Mode Active</strong> - You are viewing draft content.{' '}
          <a href="/api/disable-draft" className="underline">
            Exit draft mode
          </a>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found. Create some posts in the CMS!</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post: any) => (
            <article key={post._id} className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.author && (
                <p className="text-gray-600 mb-2">By {post.author.name}</p>
              )}
              {post.publishDate && (
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(post.publishDate).toLocaleDateString()}
                </p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      
      <SanityLive />
    </div>
  )
}