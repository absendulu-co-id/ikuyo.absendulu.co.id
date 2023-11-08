export default function Shimmer () {
  return (
    <div className="flex flex-col bg-gray-100">
        <div className="bg-gray-300 w-full h-10 animate-pulse rounded-t-lg"></div>

        <div className="flex flex-row gap-5 p-5 justify-between flex-wrap">
            {Array.from({length: 4}, (_, i) =>(
                <div key={`card-${i}`} className="flex flex-col gap-2 bg-white p-4 rounded-lg grow-1 min-w-[48%]">
                    {Array.from({length: 3}, (_, i) => (
                        <div key={`col-${i}`} className="bg-gray-200 w-full h-10 animate-pulse rounded-lg"></div>
                    ))}
                </div>
            ))}
        </div>

    </div>
  );
}
