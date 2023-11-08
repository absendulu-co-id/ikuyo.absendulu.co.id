export default function ViewAccessShimmer () {
    return (
      <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1">
        {Array.from({length: 4}, (_, i) => (
          <div key={`col-${i}`} className="bg-gray-300 w-full h-28 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }
  