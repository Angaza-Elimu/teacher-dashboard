import Layout from "../../components/Layout";
import ListBox from "../../components/ListBox";
import { useState } from "react";
import emptyImage from "../../assets/images/quiz_empty.png";
import Image from "next/image";
import InfoCard from "../../components/InfoCard";

export default function Quiz() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");

  return (
    <Layout>
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

              <p className="text-lg">Select a subtopic to view quizzes</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full gap-2 mt-10">
            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>1. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>2. </p>
              <p className="flex-1">Round off to the nearest tens: 12465</p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>3. </p>
              <p className="flex-1">Round off to the nearest hundreds: 17965</p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>4. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>5. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>6. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>7. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
            </div>

            <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
              <p>8. </p>
              <p className="flex-1">
                Workout and round off the quotent to the nearest hundredths: 9420x20
              </p>
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
