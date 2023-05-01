import Layout from "../../../components/Layout";
import ListBox from "../../../components/ListBox";
import Image from "next/image";
import emptyImage from "../../../assets/images/empty.png";
import { useState } from "react";
import InfoCard from "../../../components/InfoCard";
import Task from "../../../assets/Task";
import Clock from "../../../assets/Clock";
import Profile from "../../../assets/Profile";
import PieChart from "../../../components/PieChart";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const router = useRouter();

  const dataToDisplay = [1, 2];

  const handleClick = (ev, el) => {
    const index = el[0].index;
    router.push(
      `/students/performance/list?subject=${subject}&topic=${topic}&subtopic=${subtopic}&fail=${index}`
    );

    console.log(el[0].index);
  };

  return (
    <Layout>
      <h3 className="text-2xl mt-2.5">Student performance</h3>

      <div className="flex w-10/12 mt-3 gap-16">
        <ListBox
          options={[
            { value: "", name: "Select subject" },
            { value: "subject1", name: "Subject One" },
            { value: "subject2", name: "Subject Two" },
          ]}
          onChange={(value) => setSubject(value)}
        />
        <ListBox
          options={[
            { value: "", name: "Select topic" },
            { value: "topic1", name: "Topic One" },
            { value: "topic2", name: "Topic Two" },
          ]}
          onChange={(value) => setTopic(value)}
        />
        <ListBox
          options={[
            { value: "", name: "Select subtopic" },
            { value: "subtopic1", name: "Subtopic One" },
            { value: "subtopic2", name: "Subtopic Two" },
          ]}
          onChange={(value) => setSubtopic(value)}
        />
      </div>

      <div className="flex flex-col h-full">
        {!subject || !topic || !subtopic ? (
          <>
            <div className="flex items-center justify-center flex-col flex-1 gap-10">
              <div className="relative h-48 aspect-video md:h-[459px] md:w-[583px]">
                <Image
                  src={emptyImage}
                  fill
                  alt="no record"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <p className="text-lg">Select a subtopic to view students performance</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 py-7">
            {/* inform cards */}
            <div className="flex flex-col h-full gap-10">
              <InfoCard
                // title={formatTime(analytics?.totalTime)}
                title="10.5 Hrs"
                subtitle={`Time spent practising Hire Purchase`}
                icon={<Clock />}
              />
              <InfoCard
                title="30%"
                subtitle="Student engagement in Hire Purchase"
                icon={<Task />}
              />
              <InfoCard title="30" subtitle="Total students in Grade 8" icon={<Profile />} />
            </div>

            {/* pie chart */}
            <div className="flex-[3] mx-auto h-4/5">
              <PieChart onClick={handleClick} dataToDisplay={dataToDisplay} />
            </div>

            {/* legend */}
            <div className="flex flex-col self-end pb-14">
              <div className="flex gap-1 items-center">
                <span className="h-3 w-3 bg-alerts-success"></span>
                <p>Above 60%</p>
              </div>

              <div className="flex gap-1 items-center">
                <span className="h-3 w-3 bg-alerts-warning"></span>
                <p>Below 60%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const token = req.cookies.token;
  //redirect to login if not authenticated
  if (!token) return { redirect: { destination: "/" } };

  return {
    props: {},
  };
};
