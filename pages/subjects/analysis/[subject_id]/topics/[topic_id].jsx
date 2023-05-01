import { useRouter } from "next/router";
import Clock from "../../../../../assets/Clock";
import Profile from "../../../../../assets/Profile";
import Task from "../../../../../assets/Task";
import BackButton from "../../../../../components/BackButton";
import BarChart from "../../../../../components/BarChart";
import InfoCard from "../../../../../components/InfoCard";
import Layout from "../../../../../components/Layout";

export default function AnalysisByTopicPage() {
  const { push, query } = useRouter();

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
          <p>Topic: Money perfomance</p>
        </div>

        <div className="flex-1">
          <BarChart
            dataToDisplay={[20, 39, 45, 61, 73, 56, 80, 99]}
            labels={[
              "Profit & loss",
              "Decimals",
              "Bills ",
              "Commission",
              "Hire purchase",
              "Simple Interest",
              "Compound Interest",
              "Postal rates",
            ]}
            titleXLabel="Subtopics"
            tooltipUnit="%"
            titleYLabel="Perfomance (%)"
          />
        </div>
      </div>
    </Layout>
  );
}
