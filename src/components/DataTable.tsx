import React from "react";

interface Column<T> {
    key: keyof T;  // T -> id:number,name:string
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: number;
}

interface DataTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

function DataTable<T extends object>({ data, columns, rowKey, onRowClick, emptyMessage = "No data available" }: DataTableProps<T>) {
    if (data.length === 0) {
        return <p>{emptyMessage}</p>;
    }


    return (
        <table style={{width : '100%' , borderCollapse : 'collapse'}}>
            <thead>
                <tr style={{background : '#1E3A8A' , color : '#fff'}}>
                    {columns.map((column) => (
                        <th key={String(column.key)} style={{padding : '8' , textAlign : 'left'}}>
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row,ri) => (
                    <tr key={String(row[rowKey])} onClick={() => onRowClick?.(row)} style={{background:ri % 2 === 0 ? '#fff' : '#F8fAFC',cursor : onRowClick ? 'pointer' : 'default'}}>
                        {columns.map((column) => (
                            <td key={String(column.key)} style={{padding : '8px'}}>
                                {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;



