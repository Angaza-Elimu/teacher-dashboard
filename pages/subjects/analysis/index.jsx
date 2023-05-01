import ArrowRight from "../../../assets/ArrowRight";
import Layout from "../../../components/Layout";
import BarChart from "../../../components/BarChart";
import Link from "next/link";

export default function SubjectAnalysisPage() {
  return (
    <div>
      <Layout>
        <div className="mt-3">
          <h3>Subject performance</h3>
        </div>

        <div className="grid grid-cols-12 gap-5 flex-1 h-screen">
          <div className="col-span-8 bg-light rounded-lg border border-neutral-800/70 p-3 h-4/5">
            <div className="bg-light flex flex-1 flex-col h-full mb-10 py-10 rounded-xl">
              <div className="pl-10 text-2xl pb-5">
                <p>Grade 8 subject trends</p>
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
                  titleXLabel="Topics"
                  tooltipUnit="%"
                  titleYLabel="Perfomance (%)"
                />
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-light rounded-lg p-5 h-fit border border-neutral-800/70">
            <div className="">
              <p className="pb-5 font-medium">View per subject perfomance</p>

              <div className="flex mx-auto overflow-auto">
                <div className="flex flex-col w-full divide-y divide-neutral-900">
                  {["Math", "English", "Science", "Kiwahsili", "CRE", "Social Studies"].map(
                    (s, index) => (
                      <Link
                        passHref
                        href={`/subjects/analysis/${index + 100}`}
                        className="flex items-center justify-between w-full p-3 px-5 cursor-pointer hover:bg-neutral-900/75"
                      >
                        <p>{s}</p>
                        <ArrowRight />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
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
