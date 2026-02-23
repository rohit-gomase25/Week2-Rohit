import React, { useState } from "react";

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
  sortable?: boolean; // NEW — opt-in per column
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

// --- Component ---
function DataTable<T extends object>({ 
  data, 
  columns, 
  rowKey, 
  onRowClick, 
  emptyMessage = "No data available" 
}: DataTableProps<T>) {
  
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });

  // Toggle sort direction on each header click
  const handleSort = (key: keyof T) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sort a copy of the data — never mutate the original
  const sorted = [...data].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;
    const av = a[sort.key], bv = b[sort.key];
    if (av < bv) return sort.dir === 'asc' ? -1 : 1;
    if (av > bv) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  if (data.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
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
        {/* Use sorted instead of data in the tbody .map() */}
        {sorted.map((row, ri) => (
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
  );
}

export default DataTable;