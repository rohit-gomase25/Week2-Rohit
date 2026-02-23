import React, { useState, useEffect } from "react";

// --- Types ---
type SortDir = 'asc' | 'desc' | null;

interface SortState<T> {
  key: keyof T | null;
  dir: SortDir;
}

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  filterKey?: keyof T;
  pageSize?: number;    // NEW — rows per page
}

// --- Component ---
function DataTable<T extends object>({ 
  data, 
  columns, 
  rowKey, 
  onRowClick, 
  emptyMessage = "No data available",
  filterKey,
  pageSize
}: DataTableProps<T>) {
  
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(1);

  // Add a useEffect to reset page when filterText changes
  useEffect(() => {
    setPage(1);
  }, [filterText]);

  // Toggle sort direction on each header click
  const handleSort = (key: keyof T) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort a copy of the data
  const sorted = [...data].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;
    const av = a[sort.key], bv = b[sort.key];
    if (av < bv) return sort.dir === 'asc' ? -1 : 1;
    if (av > bv) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  // Apply filter
  const filtered = filterKey && filterText
    ? sorted.filter(row =>
        String(row[filterKey]).toLowerCase().includes(filterText.toLowerCase()))
    : sorted;

  // Pagination Logic
  const totalPages = pageSize ? Math.ceil(filtered.length / pageSize) : 1;
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paginated = pageSize
    ? filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
    : filtered;

  if (data.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div>
      {filterKey && (
        <div style={{ marginBottom: 8 }}>
          <input
            type='text'
            placeholder={`Filter by ${String(filterKey)}...`}
            value={filterText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFilterText(e.target.value);
              setPage(1); // Reset to first page on search
            }}
            style={{ 
              padding: '6px 10px', 
              borderRadius: 4,
              border: '1px solid #D1D5DB', 
              width: 220 
            }}
          />
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1E3A8A', color: '#fff' }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  padding: 8,
                  textAlign: 'left',
                  cursor: col.sortable ? 'pointer' : 'default',
                  background: '#1E3A8A',
                  color: '#fff',
                  userSelect: 'none',
                }}
              >
                {col.header}
                {col.sortable && sort.key === col.key
                  ? (sort.dir === 'asc' ? '  ▲' : '  ▼')
                  : col.sortable ? '  ⇅' : ''}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Use paginated instead of filtered */}
          {paginated.map((row, ri) => (
            <tr 
              key={String(row[rowKey])} 
              onClick={() => onRowClick?.(row)} 
              style={{ 
                background: ri % 2 === 0 ? '#fff' : '#F8fAFC', 
                cursor: onRowClick ? 'pointer' : 'default' 
              }}
            >
              {columns.map((column) => (
                <td key={String(column.key)} style={{ padding: '8px' }}>
                  {column.render 
                    ? column.render(row[column.key], row) 
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {pageSize && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <button
            disabled={safePage <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            style={{ padding: '4px 12px', cursor: safePage <= 1 ? 'not-allowed' : 'pointer' }}
          >
            ← Previous
          </button>

          <span style={{ fontSize: 14, color: '#374151' }}>
            Page {safePage} of {totalPages}
            {' '}({filtered.length} rows)
          </span>

          <button
            disabled={safePage >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            style={{ padding: '4px 12px', cursor: safePage >= totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;