export default function Shimmer () {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({length: 10}, (_, i) => (
        <div key={`col-${i}`} className="bg-gray-300 w-full h-20 animate-pulse rounded-lg"></div>
      ))}
    </div>
  );
}
