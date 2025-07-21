import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // Check for secret to confirm this is a valid request
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    // Revalidate specific pages based on document type
    if (_type === 'post') {
      // Revalidate blog list page
      revalidatePath('/blog')
      
      // Revalidate specific post page if slug exists
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`)
      }
      
      // Revalidate by tags
      revalidateTag('post')
      
      console.log(`Revalidated blog pages for post: ${slug?.current || 'unknown'}`)
    }
    
    if (_type === 'directoryItem') {
      // Revalidate directory list page
      revalidatePath('/directory')
      
      // Revalidate specific directory item page if slug exists
      if (slug?.current) {
        revalidatePath(`/directory/${slug.current}`)
      }
      
      // Revalidate by tags
      revalidateTag('directoryItem')
      
      console.log(`Revalidated directory pages for item: ${slug?.current || 'unknown'}`)
    }
    
    // Also revalidate home page in case it shows recent content
    revalidatePath('/')

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { 
        message: 'Error revalidating', 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}