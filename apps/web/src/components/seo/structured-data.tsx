import Script from 'next/script'

interface WebsiteStructuredDataProps {
  url?: string
}

export function WebsiteStructuredData({ url }: WebsiteStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Directorium',
    description: 'Curated directory of resources, tools, and services across technology, business, education, and more categories.',
    url: url || baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/directory?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Directorium',
      url: baseUrl,
    },
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BlogPostStructuredDataProps {
  title: string
  description: string
  publishDate: string
  author?: {
    name: string
  }
  url: string
  tags?: string[]
}

export function BlogPostStructuredData({
  title,
  description,
  publishDate,
  author,
  url,
  tags,
}: BlogPostStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishDate,
    dateModified: publishDate,
    author: author ? {
      '@type': 'Person',
      name: author.name,
    } : {
      '@type': 'Organization',
      name: 'Directorium Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Directorium',
      url: baseUrl,
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: tags?.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
  }

  return (
    <Script
      id="blog-post-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface DirectoryItemStructuredDataProps {
  title: string
  description: string
  category: string
  websiteUrl?: string
  url: string
}

export function DirectoryItemStructuredData({
  title,
  description,
  category,
  websiteUrl,
  url,
}: DirectoryItemStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    url,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Thing',
          name: title,
          description,
          url: websiteUrl || url,
          category,
        },
      },
    ],
  }

  return (
    <Script
      id="directory-item-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface OrganizationStructuredDataProps {
  url?: string
}

export function OrganizationStructuredData({ url }: OrganizationStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://directorium.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Directorium',
    description: 'Curated directory platform providing high-quality resources, tools, and services across multiple categories.',
    url: url || baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}