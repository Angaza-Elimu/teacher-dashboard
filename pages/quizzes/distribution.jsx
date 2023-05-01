import Layout from "../../components/Layout";
import PieChart from "../../components/PieChart";

export default function Quiz2() {
  const subjects = ["Math", "English", "Scienc", "Social Studies", "Swahili", "CRE"];

  return (
    <Layout>
      <div className="">
        <p className="text-2xl mt-2">Quiz distribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 w-5/6 flex-1">
        {subjects.map((s, i) => (
          <SmallPieChart key={i} subjectName={s} />
        ))}
      </div>

      <div className="flex gap-10 mt-10 mb-6">
        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#662E93]"></div>
          <p>Remember</p>
        </div>

        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#30308F]"></div>
          <p>Understand</p>
        </div>

        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#3BB44A]"></div>
          <p>Apply</p>
        </div>

        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#FFF301]"></div>
          <p>Analyze</p>
        </div>

        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#EB5C28]"></div>
          <p>Evaluate</p>
        </div>

        <div className="flex gap-2 items-center text-neutral-400">
          <div className="h-4 w-4 rounded bg-[#F01A27]"></div>
          <p>Create</p>
        </div>
      </div>
    </Layout>
  );
}

const SmallPieChart = ({ subjectName }) => {
  return (
    <div className="bg-light p-2 border border-neutral-800 rounded-xl py-10">
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="">
          <PieChart
            dataToDisplay={[30, 30, 40]}
            backgroundColor={["#FFF301", "#662E93", "#3BB44A", "#30308F", "#FFF301", "#F01A27"]}
          />
        </div>

        <p className="font-medium text-lg">{subjectName}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const token = req.cookies.token;
  //redirect to login if not authenticated
  if (!token) return { redirect: { destination: "/" } };

  return {
    props: {},
  };
};
