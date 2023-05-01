import Clock from "../../../assets/Clock";
import Task from "../../../assets/Task";
import Profile from "../../../assets/Profile";
import BackButton from "../../../components/BackButton";
import BarChart from "../../../components/BarChart";
import InfoCard from "../../../components/InfoCard";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

export default function AnalysisBySubject() {
  const { push, query } = useRouter();

  const handleClick = (ev, el) => {
    const index = el[0]?.element["$context"].index;

    if (index !== undefined) {
      push(`/subjects/analysis/${query.subject_id}/topics/${index}`);
    }
  };

  return (
    <Layout>
      <div className="w-fit">
        <BackButton title="Back" />
      </div>

      <div className="flex gap-5">
        <InfoCard
          title="10.5 Hrs"
          subtitle={`Time spent practising Hire Purchase`}
          icon={<Clock />}
        />
        <InfoCard title="19%" subtitle="Student engagement in Hire Purchase" icon={<Task />} />
        <InfoCard title="30" subtitle="Total students in Grade 8" icon={<Profile />} />
      </div>

      <div className="flex flex-col flex-1 relative bg-light rounded-xl border border-neutral-800 mb-10 py-10 w-5/6">
        <div className="pl-10 text-2xl pb-5">
          <p>Grade 8 Math topic performance</p>
        </div>

        <div className="flex-1">
          <BarChart
            dataToDisplay={[2, 3, 45, 6, 6, 56, 80, 99]}
            labels={[
              "Numbers",
              "Decimals",
              "Money",
              "Geometry",
              "Algebra",
              "Time, Speed",
              "Volume, Mass",
              "Fractions",
            ]}
            titleXLabel="Topics"
            tooltipUnit="%"
            titleYLabel="Perfomance (%)"
            onClick={handleClick}
          />
        </div>
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
