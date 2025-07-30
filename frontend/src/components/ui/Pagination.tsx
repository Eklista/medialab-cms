import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  totalItems,
  itemsPerPage,
  className,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pages = getVisiblePages();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={clsx('flex items-center justify-between', className)}>
      {/* Info */}
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-sm text-text-secondary">
          Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} a{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
        </div>
      )}

      {/* Pagination Controls */}
      <nav className="flex items-center space-x-1">
        {/* Previous Button */}
        <motion.button
          className={clsx(
            'inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md transition-colors',
            currentPage === 1
              ? 'text-text-secondary cursor-not-allowed'
              : 'text-text-primary hover:bg-zinc-800 hover:text-white'
          )}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center justify-center w-8 h-8 text-text-secondary"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <motion.button
              key={pageNumber}
              className={clsx(
                'inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-text-primary hover:bg-zinc-800 hover:text-white'
              )}
              onClick={() => handlePageChange(pageNumber)}
              whileHover={!isActive ? { scale: 1.05 } : {}}
              whileTap={!isActive ? { scale: 0.95 } : {}}
              style={isActive ? { fontFamily: 'Poppins, system-ui, sans-serif' } : {}}
            >
              {pageNumber}
            </motion.button>
          );
        })}

        {/* Next Button */}
        <motion.button
          className={clsx(
            'inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md transition-colors',
            currentPage === totalPages
              ? 'text-text-secondary cursor-not-allowed'
              : 'text-text-primary hover:bg-zinc-800 hover:text-white'
          )}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </nav>
    </div>
  );
}