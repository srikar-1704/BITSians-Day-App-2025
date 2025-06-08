import { useEvents } from '../hooks/useEvents';
import { EventMap } from '../components/EventMap';

function Index() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Events</h2>
          <p className="text-gray-600">Fetching alumni events from around the world...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Global Alumni Events
              </h1>
              <p className="text-gray-600 mt-1">
                Discover alumni meetups happening around the world
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {events.length} events worldwide
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4" style={{ height: 'calc(100vh - 200px)' }}>
          <EventMap events={events} />
        </div>
      </main>

      {/* Instructions for Setup */}
      {events.length === 0 && !loading && !error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              🚀 Setup Required
            </h3>
            <div className="text-blue-700 space-y-2">
              <p>To get started with your event map:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Replace <code className="bg-blue-100 px-1 rounded">YOUR_GOOGLE_SHEET_ID_HERE</code> in the code with your actual Google Sheet ID</li>
                <li>Add your Mapbox access token (free: 50,000 map loads/month!)</li>
                <li>Make sure your Google Sheet is publicly accessible</li>
                <li>Follow the deployment guide for detailed instructions</li>
              </ol>
              <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded">
                <p className="text-green-800 text-sm">
                  💡 <strong>Now using Mapbox!</strong> Much cheaper than Google Maps with better features and 50,000 free monthly map loads.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;