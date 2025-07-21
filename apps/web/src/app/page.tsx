export default function Home() {
  return (
    <div className="prose max-w-none">
      {/* Add main heading for SEO */}
      <h1>Welcome to Directorium</h1>
      
      <p>
        Directorium is a comprehensive platform that combines a curated directory of resources 
        with a powerful content management system. Built with modern web technologies, it provides 
        a seamless experience for both content creators and consumers.
      </p>

      <h2>Getting Started</h2>
      
      <p>
        This documentation will help you understand how to use the Directorium platform effectively. 
        Whether you're looking to contribute content, integrate our API, or simply browse our directory, 
        you'll find the information you need here.
      </p>

      <h3>Quick Links</h3>
      
      <ul className="space-y-2 mb-6">
        <li>
          <a href="/docs/api" className="text-blue-600 hover:text-blue-800 font-medium">
            API Reference
          </a> - Complete API documentation and examples
        </li>
        <li>
          <a href="/docs/guides" className="text-blue-600 hover:text-blue-800 font-medium">
            Integration Guides
          </a> - Step-by-step integration tutorials
        </li>
        <li>
          <a href="/directory" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse Directory
          </a> - Explore our curated resource directory
        </li>
        <li>
          <a href="/posts" className="text-blue-600 hover:text-blue-800 font-medium">
            Latest Posts
          </a> - Read our latest blog posts and updates
        </li>
      </ul>

      <h3>Key Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Curated Directory</h4>
          <p className="text-gray-600">
            Discover high-quality resources across technology, business, education, and more categories.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Content Management</h4>
          <p className="text-gray-600">
            Powerful CMS with live preview, structured content, and seamless publishing workflows.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Developer-Friendly API</h4>
          <p className="text-gray-600">
            RESTful API with comprehensive documentation and SDKs for popular programming languages.
          </p>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Real-time Updates</h4>
          <p className="text-gray-600">
            Live preview functionality and real-time content synchronization across all platforms.
          </p>
        </div>
      </div>

      <h3>Example Code</h3>
      
      <p>Here's a quick example of how to fetch directory items using our API:</p>
      
      <pre><code>{`// Fetch directory items
const response = await fetch('/api/directory');
const items = await response.json();

// Filter by category
const techItems = items.filter(item => item.category === 'technology');

console.log('Technology resources:', techItems);`}</code></pre>

      <p>
        For more detailed examples and comprehensive documentation, explore the sections 
        in the sidebar navigation.
      </p>
    </div>
  );
}

// Add page-specific metadata for home page
export const metadata = {
  title: 'Curated Directory & Platform Documentation',
  description: 'Discover high-quality resources, tools, and services across technology, business, education, health, entertainment, and more. Access comprehensive API documentation and integration guides.',
  keywords: [
    'directory',
    'curated resources',
    'technology tools',
    'business services',
    'education platform',
    'API documentation',
    'developer tools',
    'resource discovery',
  ],
  openGraph: {
    title: 'Directorium - Curated Directory & Platform Documentation',
    description: 'Discover high-quality resources, tools, and services across multiple categories.',
    type: 'website',
    images: ['/og-home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directorium - Curated Directory & Platform Documentation',
    description: 'Discover high-quality resources, tools, and services across multiple categories.',
    images: ['/og-home.png'],
  },
}
