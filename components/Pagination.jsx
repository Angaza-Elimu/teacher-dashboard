import _ from "lodash";
import ChevronLeft from "../assets/ChevronLeft";

export default function Pagination({ currentPage, totalCount, onPageChange, pageSize }) {
  const pagesCount = Math.ceil(totalCount / pageSize);

  if (pagesCount <= 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <>
      {currentPage !== 1 && (
        <div onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="stroke-neutral-600 hover:stroke-primary-700 cursor-pointer stroke-2" />
        </div>
      )}
      {
        <>
          {pagesCount > 3 && (
            <p
              className={`${
                currentPage === 1
                  ? " text-primary-700 "
                  : " text-neutral-600 hover:text-primary-700"
              } cursor-pointer`}
              onClick={() => onPageChange(1)}
            >
              1
            </p>
          )}
          {pagesCount > 3 && currentPage !== 1 && currentPage >= 3 && (
            <>
              <p>...</p>
            </>
          )}
        </>
      }
      {pages.length > 5
        ? pages
            .slice(pages.indexOf(currentPage - 1), pages.indexOf(currentPage) + 2)
            .filter((p) => p !== 1)
            .map((page, i) => (
              <p
                className={`${
                  currentPage === page
                    ? " text-primary-700 "
                    : " text-neutral-600 hover:text-primary-700"
                } cursor-pointer`}
                key={i}
                onClick={() => onPageChange(page)}
              >
                {page}
              </p>
            ))
        : pages.map((page, i) => (
            <p
              className={`${
                currentPage === page
                  ? " text-primary-700 "
                  : " text-neutral-600 hover:text-primary-700"
              } cursor-pointer`}
              key={i}
              onClick={() => onPageChange(page)}
            >
              {page}
            </p>
          ))}
      {
        <>
          {pagesCount > 3 && currentPage + 1 < pages.length && (
            <>
              <p>...</p>
              <p
                className={`${
                  currentPage === pages.length + 1
                    ? " text-primary-700 "
                    : " text-neutral-600 hover:text-primary-700"
                } cursor-pointer`}
                onClick={() => onPageChange(pages.length + 1)}
              >
                {pages.length}
              </p>
            </>
          )}
        </>
      }
      {currentPage !== pages.pop() && (
        <div onClick={() => onPageChange(currentPage + 1)}>
          <ChevronLeft className="stroke-neutral-600 rotate-180 hover:stroke-primary-700 cursor-pointer stroke-2" />
        </div>
      )}
    </>
  );
}
