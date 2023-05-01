import { useState } from "react";
import BackButton from "../../../../components/BackButton";
import Layout from "../../../../components/Layout";
import SearchBar from "../../../../components/SearchBar";
import Table from "../../../../components/table/Table";

export default function Performancelist() {
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});

  return (
    <Layout>
      <div className="w-fit">
        <BackButton link="/students/performance" title="Back" />
      </div>
      <SearchBar onChange={(searchQuery) => console.log(searchQuery)} />

      <div className="flex w-full h-full">
        <Table
          columns={[
            { name: "Name", sortable: true },
            { name: "Time on Platform", sortable: true },
            { name: "Score", sortable: true },
          ]}
          currentPage={currentPage}
          data={[
            { id: 1, name: "Austin Charles", timeOnPlatform: 200, score: 14 },
            { id: 2, name: "Kelvin Tutu", timeOnPlatform: 100, score: 14 },
          ]}
          // href="/database/schools"
          // onPageChange={handlePageChange}
          // onSort={handleSort}
          pageSize={pageSize}
          sortColumn={sortColumn}
          totalCount={2}
          href={"/students/performance/single"}
        />
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
