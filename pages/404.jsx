import Image from "next/image";
import imageOf404 from "../assets/images/404.png";
import { useRouter } from "next/router";
import Head from "next/head";

export default function _404Page() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Teacher's Dashboard - 404 page not found</title>
      </Head>

      <div className="bg-neutral-900">
        <div className="flex h-screen justify-center items-center flex-col gap-6">
          <div className="relative h-48 aspect-video md:h-[459px] md:w-[583px]">
            <Image fill src={imageOf404} alt="404" />
          </div>
          <div className="flex flex-col gap-6 mt-4 px-10">
            <p className="text-lg text-center">
              Sorry, we can't seem to locate the page you're looking for.
            </p>
            <button
              className="rounded-lg text-light bg-primary-600 px-5 w-fit py-3 mx-auto text-lg transition-all duration-200 hover:scale-105 ease-out hover:shadow-md"
              onClick={() => router.back()}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
