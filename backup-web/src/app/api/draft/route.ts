import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Check the secret and next parameters
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable()

  // Redirect to the path from the fetched post
  redirect(slug || '/')
}