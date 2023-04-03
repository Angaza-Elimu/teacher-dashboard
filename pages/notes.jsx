import Image from "next/image";
import Layout from "../components/Layout";
import ListBox from "../components/ListBox";
import { useState } from "react";
import emptyImage from "../assets/images/note_empty.png";

export default function Notes() {
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

              <p className="text-lg">Select a subtopic to view notes</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 py-7 bg-light rounded-xl mb-10">
            <textarea
              name=""
              className="p-5 prose max-w-prose w-full outline-none"
              id=""
              cols="30"
              rows="10"
              value={`Definition
Square root means what number multiplied by itself results in the given number.
Example 1.8
What is the square root of 1225?

Solution

Express it as a product of prime factors and pick one factor from two similar factors.
 `}
            ></textarea>
          </div>
        )}
      </div>
    </Layout>
  );
}
