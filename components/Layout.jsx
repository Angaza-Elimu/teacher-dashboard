import Head from "next/head";
import Image from "next/image";
import Sidebar from "./Sidebar";
import profile from "../assets/images/avatar.png";
import { useState } from "react";
import ChevronLeft from "../assets/ChevronLeft";

export default function Layout({ children, title = "" }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      <Head>
        <title>{`Teacher's Dashboard ${title && `- ${title}`}`}</title>
      </Head>

      <div className="relative h-screen">
        <div className="absolute right-14 top-8">
          <div className="h-[50px] w-[50px] relative z-[70]">
            <Image src={profile} fill className="rounded-full" alt="avatar" />
          </div>
        </div>
        <div className="grid grid-cols-sidebar h-screen">
          {/* sidebar */}
          <div className={`bg-light h-full ${minimized ? "hidden" : "block"}`}>
            <Sidebar onHide={setMinimized} />
          </div>

          <main
            className={`bg-neutral-900 p-5 px-10 flex flex-col gap-6 flex-1 overflow-y-auto pt-8 pb-1.5 ${
              minimized ? "col-span-full" : "col-span-1"
            }`}
          >
            {children}
          </main>
        </div>

        {minimized && (
          <div
            className="absolute left-0 bottom-5 rounded-r-full cursor-pointer bg-primary-900 p-2 px-4 opacity-70  scale-90 hover:shadow-lg hover:scale-100 transition-all duration-200 ease-linear"
            onClick={() => setMinimized((prev) => !prev)}
          >
            <ChevronLeft className="rotate-180 stroke-primary-500 stroke-2" />
          </div>
        )}
      </div>
    </>
  );
}
