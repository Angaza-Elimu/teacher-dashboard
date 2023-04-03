import { useRouter } from "next/navigation";
import Link from "next/link";

import ChevronLeft from "../assets/ChevronLeft";

export default function BackButton({ link = "", title }) {
  const router = useRouter();

  return (
    <Link passHref href={link} className="" onClick={() => !link && router.back("")}>
      <div className="flex bg-primary-700 p-5 rounded-lg py-2.5 text-light font-medium text-lg gap-2 items-center cursor-pointer">
        <ChevronLeft className="stroke-light stroke-2" />
        <p>{title}</p>
      </div>
    </Link>
  );
}
