export default function NotificationShimmer () {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({length: 5}, (_, i) => (
        <div key={`col-${i}`} className="bg-gray-200 w-full h-14 animate-pulse rounded-lg"></div>
      ))}
    </div>
  );
}
