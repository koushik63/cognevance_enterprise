import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
            page === currentPage
              ? 'bg-[#4F8CFF] text-white shadow-lg shadow-[#4F8CFF]/20'
              : 'bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2.5 rounded-xl bg-[#151922] border border-[#293241] text-[#A5ADBA] hover:text-white hover:border-[#4F8CFF]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
