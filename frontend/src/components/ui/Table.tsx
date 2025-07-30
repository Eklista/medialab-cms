import { forwardRef } from 'react';
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped';
}

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  clickable?: boolean;
}

// Table Container
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={clsx(
          'w-full caption-bottom text-sm',
          className
        )}
        {...props}
      />
    </div>
  )
);

Table.displayName = 'Table';

// Table Header
const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={clsx('border-b border-border', className)}
      {...props}
    />
  )
);

TableHeader.displayName = 'TableHeader';

// Table Body
const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={clsx('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
);

TableBody.displayName = 'TableBody';

// Table Row
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, clickable = false, ...props }, ref) => (
    <motion.tr
      ref={ref}
      className={clsx(
        'border-b border-border transition-colors',
        clickable && 'hover:bg-zinc-800/50 cursor-pointer',
        className
      )}
      whileHover={clickable ? { backgroundColor: 'rgba(39, 39, 42, 0.5)' } : {}}
      {...(props as any)}
    />
  )
);

TableRow.displayName = 'TableRow';

// Table Head Cell
const TableHead = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ 
    className, 
    sortable = false, 
    sortDirection = null, 
    onSort, 
    children,
    ...props 
  }, ref) => {
    const handleSort = () => {
      if (sortable && onSort) {
        onSort();
      }
    };

    return (
      <th
        ref={ref}
        className={clsx(
          'h-12 px-4 text-left align-middle font-semibold text-text-primary',
          sortable && 'cursor-pointer select-none hover:text-white transition-colors',
          className
        )}
        onClick={handleSort}
        {...props}
      >
        <div className="flex items-center space-x-2">
          <span style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
            {children}
          </span>
          {sortable && (
            <div className="flex flex-col">
              <ChevronUp 
                className={clsx(
                  'h-3 w-3 transition-colors',
                  sortDirection === 'asc' ? 'text-white' : 'text-zinc-600'
                )} 
              />
              <ChevronDown 
                className={clsx(
                  'h-3 w-3 -mt-1 transition-colors',
                  sortDirection === 'desc' ? 'text-white' : 'text-zinc-600'
                )} 
              />
            </div>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

// Table Cell
const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={clsx(
        'p-4 align-middle text-text-primary',
        className
      )}
      {...props}
    />
  )
);

TableCell.displayName = 'TableCell';

// Table Caption
const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={clsx('mt-4 text-sm text-text-secondary', className)}
      {...props}
    />
  )
);

TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

export default Table;