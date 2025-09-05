export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
        <div className="space-y-2">
          <div className="h-6 bg-white bg-opacity-20 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-white bg-opacity-10 rounded w-32 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
