import Spinner from "../assets/Spinner";

export default function Button({
  className,
  Component,
  disabled,
  name,
  onClick,
  type = "PRIMARY",
  loading = false,
}) {
  let _className = "";

  switch (type) {
    case "PRIMARY":
      _className = `bg-primary-700/80 px-4 rounded-lg py-3 text-light font-medium text-lg cursor-pointer transition-all ease-in-out border border-primary-700/80 ${className} ${
        disabled ? " cursor-not-allowed opacity-50" : " hover:bg-primary-700 hover:shadow"
      }`;
      break;

    case "SECONDARY":
      _className = `bg-[#FBFBFB] px-4 rounded-lg py-3 text-primary-700 font-medium text-lg cursor-pointer border border-neutral-800 hover:border-primary-700 transition-all ease-in-out ${className} ${
        disabled
          ? " cursor-not-allowed opacity-50"
          : " hover:bg-primary-700/80 hover:shadow hover:text-light"
      }`;
      break;

    default:
      break;
  }

  return (
    <button className={_className} disabled={disabled} onClick={onClick}>
      {loading && <Spinner />}
      {name}
      {Component && <Component />}
    </button>
  );
}
