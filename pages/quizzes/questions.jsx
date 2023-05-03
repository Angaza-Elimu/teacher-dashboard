import { useEffect, useState } from "react";
import Image from "next/image";

import Layout from "../../components/Layout";
import ListBox from "../../components/ListBox";
import emptyImage from "../../assets/images/quiz_empty.png";
import InfoCard from "../../components/InfoCard";
import { getQuiz, getSubjects, getSubtopics, getTopics } from "../../api/subject";
import { getToken } from "../../api/auth";

export default function Quiz({ subjects }) {
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [quiz, setQuiz] = useState([]);

  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopics({
        token,
        class_id: "6",
        subject_id: selectedSubject,
      });
      setTopics(data);
      setSelectedTopic("");
      setSelectedSubtopic("");

      setQuiz([]);
    };

    fetchData();
  }, [selectedSubject]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSubtopics({ token, topic_id: selectedTopic });
      setSubtopics(data);
    };

    fetchData();
  }, [selectedTopic]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const { data } = await getQuiz({ token, subtopic_id: selectedSubtopic });

      setQuiz(data);
      // console.log(data);
    };

    fetchQuiz();
  }, [selectedSubtopic]);

  console.log(subtopics, selectedSubtopic);

  return (
    <Layout>
      <div className="flex w-10/12 mt-3 gap-5">
        <ListBox
          options={[{ name: "Select subject", value: "" }].concat(
            subjects
              .sort((a, b) => a.subject_name.localeCompare(b.subject_name))
              .map((s) => ({ name: s.subject_name, value: s.id }))
          )}
          onChange={(value) => setSelectedSubject(value)}
        />
        <ListBox
          options={[{ value: "", name: "Select topic" }].concat(
            topics
              .sort((a, b) => a.topic_name.localeCompare(b.topic_name))
              .map((t) => ({ name: t.topic_name, value: t.id }))
          )}
          onChange={(value) => setSelectedTopic(value)}
        />
        <ListBox
          options={[{ value: "", name: "Select subtopic" }].concat(
            subtopics
              .sort((a, b) => a.subtopic_name.localeCompare(b.subtopic_name))
              .map((s) => ({ name: s.subtopic_name, value: s.id }))
          )}
          onChange={(value) => setSelectedSubtopic(value)}
        />
      </div>

      <div className="flex flex-col h-full">
        {!selectedSubject || !selectedTopic || !selectedSubtopic ? (
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
        ) : quiz.length === 0 ? (
          <div className="flex flex-col w-full gap-2 mt-10 pb-7 items-center justify-center h-full">
            <p>No quiz found for {subtopics.find((s) => s.id == selectedSubtopic).subtopic_name}</p>
          </div>
        ) : (
          <div className="flex flex-col w-full lg:w-9/12 gap-2 mt-10 pb-7">
            {quiz.map((q, index) => (
              <div className="bg-light rounded-xl border border-neutral-800 p-5 py-4 flex items-center flex-wrap flex-1 gap-5">
                <p>{index + 1}.</p>
                <div
                  dangerouslySetInnerHTML={{ __html: q?.question }}
                  className="flex-1 prose"
                ></div>
              </div>
            ))}
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

  const { data: subjects } = await getSubjects(token);

  return {
    props: {
      subjects,
    },
  };
};
