import Image from "next/image";
import Button from "../components/Button";
import Layout from "../components/Layout";
import wipImage from "../assets/images/WIP.png";
import { useRouter } from "next/router";

export default function AsATeacherPage() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col gap-5 items-center justify-between flex-1 py-20">
        <div className="flex-1">
          <div className="relative">
            <Image src={wipImage} alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Oh my, you've caught us! We are still developing this page.</p>

          <Button name="Back" className="w-fit mx-auto px-16" onClick={() => router.back()} />
        </div>
      </div>
    </Layout>
  );
}
