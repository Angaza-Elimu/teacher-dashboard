import Link from "next/link";
import { Fragment } from "react";
import SortArrowDown from "../../assets/SortArrowDown";
import SortArrowUp from "../../assets/SortArrowUp";
// import Filter from "../Filter";
import Pagination from "../Pagination";

export default function Table({
  data,
  onSelect,
  columns,
  onSort,
  sortColumn,
  href,
  pageSize,
  totalCount,
  currentPage,
  onPageChange,
  filters,
  onFilterRemove,
}) {
  const raiseSort = (path) => {
    const nSortColumn = { ...sortColumn };

    if (!path) return null;

    if (nSortColumn.path === path) {
      nSortColumn.order = nSortColumn.order === "asc" ? "desc" : (nSortColumn.path = null);
    } else {
      nSortColumn.path = path;
      nSortColumn.order = "asc";
    }

    onSort({ ...nSortColumn });
  };

  return (
    <div className="flex-1 flex">
      <div className="relative flex-1 flex flex-col">
        {!data || data.length === 0 ? (
          <div className="flex justify-center items-center flex-1">
            <p>No record found.</p>
          </div>
        ) : (
          <div>
            <table className="w-full flex-1 overflow-hidden rounded-lg shadow-lg">
              <thead className=" select-none bg-light ">
                <tr className="rounded-md">
                  <th className="p-4 py-4 pr-0 text-lg text-left w-3">
                    <div className="h-5 w-5"></div>
                  </th>
                  {columns.map(({ name: columnName, sortable }, i) => (
                    <th
                      className={`p-4 py-2 text-lg font-light  text-left ${
                        sortable ? "cursor-pointer" : ""
                      }`}
                      key={i}
                      onClick={() => sortable && raiseSort(columnName)} //handles if column is sortable
                    >
                      {columnName}{" "}
                      {columnName === sortColumn?.path ? (
                        sortColumn?.order === "desc" ? (
                          <SortArrowDown className="stroke stroke-dark inline-block w-4 h-3 stroke-2" />
                        ) : (
                          <SortArrowUp className="stroke stroke-dark inline-block w-4 h-3 stroke-2" />
                        )
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((d, i) => {
                  // const _href = href ? `${href}/${d.id}` : "";
                  const _href = href ? `${href}` : "";

                  return (
                    <Link legacyBehavior passHref={false} href={_href} key={i} scroll={!!href}>
                      <tr
                        key={i}
                        onClick={() => {} /* router.push() */}
                        className={`${
                          _href ? "cursor-pointer" : ""
                        } hover:scale-[0.999] transition-all ease-in-out duration-[50ms] ${
                          i % 2 !== 0
                            ? "bg-neutral-900/70 hover:bg-light/70"
                            : "bg-primary-900/70 hover:bg-primary-900"
                        }`}
                      >
                        <td className="p-4 py-4 pr-0 text-dark">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-5 w-5 border-neutral-600 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                              onChange={() => onSelect && onSelect(d)}
                              checked={d.checked}
                            />
                          </div>
                        </td>
                        {columns.map(({ name: h }, i) => (
                          <Fragment key={i}>
                            <td className="p-4 py-4 text-dark">
                              {
                                d[
                                  h
                                    .toLowerCase()
                                    .split(" ")
                                    .map((e, i) =>
                                      i === 0 ? e : e.charAt(0).toUpperCase() + e.substring(1)
                                    )
                                    .join("") //handles headings like timeOnPlatform = Time on platform
                                ]
                              }
                            </td>
                          </Fragment>
                        ))}
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-8 mb-5 flex-1 items-end">
          {/* filters */}
          {/* <div className="flex gap-2 gap-y-1 flex-wrap">
            {filters?.map((filter, i) => (
              <Filter filterName={filter.name} key={i} onRemove={() => onFilterRemove(filter)} />
            ))}
          </div> */}

          {/* pagination */}
          <div className="flex gap-3 items-center text-neutral-600 font-medium select-none">
            <Pagination
              pageSize={pageSize}
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
