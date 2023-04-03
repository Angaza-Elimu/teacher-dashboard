export default function Header({ className = "", text }) {
  return <p className={`font-normal md:font-semibold text-lg md:text-4xl ${className}`}>{text}</p>;
}
