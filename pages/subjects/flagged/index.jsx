import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import Modal from "../../../components/Modal";
import Plus from "../../../assets/Plus";
import Table from "../../../components/table/Table";
import ListBox from "../../../components/ListBox";
import { useState } from "react";

export default function FlaggedPage() {
  const [newFlag, setNewFlag] = useState({
    class: "",
    subject: "",
    topic: "",
    subtopic: "",
    revisited: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [dataToDisplay, setDataToDisplay] = useState([
    {
      id: 1,
      class: "Grade 8",
      subject: "Math",
      topic: "Numbers",
      subtopic: "Numbers",
      revisited: false,
    },
    {
      id: 2,
      class: "Grade 8",
      subject: "Math",
      topic: "Numbers",
      subtopic: "Numbers",
      revisited: false,
    },
    {
      id: 3,
      class: "Grade 8",
      subject: "Math",
      topic: "Numbers",
      subtopic: "Numbers",
      revisited: false,
    },
    {
      id: 4,
      class: "Grade 8",
      subject: "Math",
      topic: "Numbers",
      subtopic: "Numbers",
      revisited: false,
    },
  ]);

  return (
    <Layout>
      <div className="flex items-center justify-between w-4/5">
        <h4 className="text-2xl">Flagged areas</h4>
        <Button
          name="Add new"
          className="flex flex-row-reverse gap-2 px-3"
          Component={() => <Plus className="stroke-light stroke-1.5" />}
          onClick={() => setOpenModal(true)}
        />
      </div>

      <div className="flex flex-1">
        <Table
          columns={[
            { name: "Class", sortable: true },
            { name: "Subject", sortable: true },
            { name: "Topic", sortable: true },
            { name: "Subtopic", sortable: true },
            { name: "Revisited", sortable: false },
          ]}
          data={dataToDisplay}
        />
      </div>

      <Modal isOpen={openModal}>
        <div className="p-2">
          <h2 className="text-center text-2xl font-medium">Add new area to revisit</h2>

          <div className="flex flex-col gap-6 py-4">
            <ListBox
              options={[
                { value: "", name: "Class" },
                { value: "class1", name: "Class One" },
                { value: "class2", name: "Class Two" },
              ]}
              onChange={(value) => setNewFlag((flag) => ({ ...flag, class: value }))}
              gray
            />
            <ListBox
              options={[
                { value: "", name: "Subject" },
                { value: "subject1", name: "Subject One" },
                { value: "subject2", name: "Subject Two" },
              ]}
              onChange={(value) => setNewFlag((flag) => ({ ...flag, subject: value }))}
              gray
            />
            <ListBox
              options={[
                { value: "", name: "Topic" },
                { value: "topic1", name: "Topic One" },
                { value: "topic2", name: "Topic Two" },
              ]}
              onChange={(value) => setNewFlag((flag) => ({ ...flag, topic: value }))}
              gray
            />
            <ListBox
              options={[
                { value: "", name: "Subtopic (optional)" },
                { value: "subtopic1", name: "Subtopic One" },
                { value: "subtopic2", name: "Subtopic Two" },
              ]}
              onChange={(value) => setNewFlag((flag) => ({ ...flag, subtopic: value }))}
              gray
            />
          </div>

          <div className="flex gap-4 items-center justify-between w-full pt-6">
            <Button
              type="SECONDARY"
              name="Cancel"
              className="flex-1 select-none"
              onClick={() => {
                setOpenModal(false);
                setNewFlag({ class: "", subject: "", topic: "", subtopic: "", revisited: false });
              }}
            />
            <Button
              name="Save"
              className="flex-1 select-none"
              onClick={() => {
                setDataToDisplay((dtd) => [...dtd, { id: dataToDisplay.length + 1, ...newFlag }]);

                setOpenModal(false);
                setNewFlag({ class: "", subject: "", topic: "", subtopic: "", revisited: false });
              }}
            />
          </div>
        </div>
      </Modal>
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
