export default function NotificationEmpty () {
  return (
    <div className="mt-8 mb-8 flex w-full flex-row justify-center bg-white p-20">
    <div
      className={"flex flex-col items-center justify-center"}
    >
      <img
        src={`/img/notification.png`}
        alt="card-image"
        className="h-40 rounded-sm"
      />
      <h6 className="mt-4 text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {"Yeah your notification is empty"}
      </h6>
    </div>
  </div>
  );
}
