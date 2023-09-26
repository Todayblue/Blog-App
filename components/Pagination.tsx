import { ITEM_PER_PAGE } from "../lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  url: string;
  isPreviousData: boolean;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  url,
  isPreviousData,
  onPageChange,
}) => {
  const router = useRouter();

  const handleNextPageClick = () => {
    onPageChange(currentPage + 1);

    router.push(`${url}${currentPage + 1}&limit=${ITEM_PER_PAGE}`);
  };

  const pageCount = Math.ceil(totalItems / ITEM_PER_PAGE);

  const handlePreViousPageClick = () => {
    onPageChange(currentPage - 1);
    router.push(`${url}${currentPage - 1}&limit=${ITEM_PER_PAGE}`);
  };

  return (
    <div className="btn-group">
      <button
        disabled={currentPage == 1 || isPreviousData}
        onClick={handlePreViousPageClick}
        className="btn"
      >
        «
      </button>
      <button className="btn">Page {currentPage}</button>

      <button
        disabled={currentPage === pageCount || isPreviousData}
        onClick={handleNextPageClick}
        className="btn"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
