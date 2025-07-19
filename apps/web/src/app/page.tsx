import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Directorium</h1>
      <p className="text-gray-600 mb-8">Welcome to the Directorium web application with live preview capabilities!</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/posts" 
          className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Posts</h2>
          <p className="text-gray-600">Browse blog posts and articles</p>
        </Link>
        
        <Link 
          href="/directory" 
          className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Directory</h2>
          <p className="text-gray-600">Explore directory items and resources</p>
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-900 mb-2">Live Preview Setup</h3>
        <p className="text-blue-800 text-sm">
          This app is configured with Sanity live preview. Edit content in the CMS 
          and see changes reflected here in real-time!
        </p>
      </div>
    </main>
  );
}
