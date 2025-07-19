import { draftMode } from 'next/headers'
import { sanityFetch, SanityLive } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  publishDate,
  tags,
  author->{name, bio}
}`

interface PostPageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const { isEnabled: isDraftMode } = draftMode()
  
  const post = await sanityFetch({
    query: POST_QUERY,
    params: { slug: params.slug },
    perspective: isDraftMode ? 'previewDrafts' : 'published',
  })

  if (!post) {
    notFound()
  }

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
      
      <Link href="/posts" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to Posts
      </Link>
      
      <article className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        {post.author && (
          <div className="mb-4">
            <p className="text-gray-600">By {post.author.name}</p>
            {post.author.bio && (
              <p className="text-gray-500 text-sm">{post.author.bio}</p>
            )}
          </div>
        )}
        
        {post.publishDate && (
          <p className="text-gray-500 text-sm mb-6">
            Published on {new Date(post.publishDate).toLocaleDateString()}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {post.body && (
          <div className="prose max-w-none">
            <p className="text-gray-600">Content will render here when body content is available.</p>
          </div>
        )}
      </article>
      
      <SanityLive />
    </div>
  )
}