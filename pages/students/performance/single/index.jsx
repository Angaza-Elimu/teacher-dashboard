import Clock from "../../../../assets/Clock";
import Task from "../../../../assets/Task";
import BackButton from "../../../../components/BackButton";
import BarChart from "../../../../components/BarChart";
import InfoCard from "../../../../components/InfoCard";
import Layout from "../../../../components/Layout";

export default function Performancelist2() {
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
        <InfoCard title="30%" subtitle="Student engagement in Hire Purchase" icon={<Task />} />
      </div>

      <div className="flex flex-col flex-1 relative bg-light rounded-xl border border-neutral-800 mb-10 py-10 w-5/6">
        <div className="pl-10 text-2xl pb-5">
          <p>Kate Joe perfomance: Hire purchase</p>
        </div>

        <div className="flex-1">
          <BarChart
            dataToDisplay={[2, 3, 45, 6, 6, 56, 80, 99]}
            labels={[
              "Jun 12",
              "Jul 20",
              "Sept 1 ",
              "Sep 10",
              "Sep 10",
              "Sep 30",
              "Oct 10",
              "Nov 20",
            ]}
            titleXLabel="Attempt"
            tooltipUnit="%"
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
