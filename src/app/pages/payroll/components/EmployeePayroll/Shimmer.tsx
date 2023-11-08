export default function ShimmerEmployee () {
  return (
    <div className="px-16 flex flex-row gap-4 bg-white p-4 rounded-lg grow-1 min-w-[48%]">
        <div className="bg-gray-200 w-4/6 h-10 animate-pulse rounded-lg"></div>
        <div className="bg-gray-200 w-1/6 h-10 animate-pulse rounded-lg"></div>
        <div className="bg-gray-200 w-1/6 h-10 animate-pulse rounded-lg"></div>
    </div>
  );
}
