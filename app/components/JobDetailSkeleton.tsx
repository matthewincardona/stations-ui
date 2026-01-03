export default function JobDetailSkeleton() {
  return (
    <div className="max-w-3xl m-auto bg-white p-6 rounded-xl mt-10 shadow-sm animate-pulse">
      <div className="w-24 h-8 bg-gray-300 rounded-full mb-4" />

      <div className="w-3/4 h-6 bg-gray-300 rounded mb-2" />
      <div className="w-1/2 h-5 bg-gray-300 rounded mb-6" />

      <div className="space-y-3">
        <div className="w-full h-4 bg-gray-300 rounded" />
        <div className="w-5/6 h-4 bg-gray-300 rounded" />
        <div className="w-4/6 h-4 bg-gray-300 rounded" />
        <div className="w-3/6 h-4 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
