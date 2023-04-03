export default function Notification({ message, type }) {
  let title = "",
    className = "",
    icon = "";

  switch (type.toLowerCase()) {
    case "success":
      title = "Success";
      className = "bg-gain ";
      icon = "";
      break;

    case "info":
      title = "Info";
      className = "bg-primary-600 ";
      icon = "";
      break;

    case "warning":
      title = "Warning";
      className = "bg-alerts-warning ";
      icon = "";
      break;

    case "danger":
      title = "Danger";
      className = "bg-loss ";
      icon = "";
      break;

    default:
      break;
  }
  return (
    <div className="rounded-xl">
      <div className={`flex ${className} text-light`}>
        <div className={`w-1.5 ${className}`}></div>
        <div className="flex p-3 py-3 gap-3">
          {/* <div className={`h-6 w-6 rounded-full mt-1.5 ${className}`}></div> */}

          <div className="flex flex-col py-1">
            {/* <h3 className="text-dark font-bold text-xl pb-1">{title}</h3> */}
            <p className="text-base">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
