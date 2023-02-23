import { ColumnDef, ColumnResizeMode, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { FC, useEffect, useRef } from "react";
import SimpleBar from 'simplebar-react';

import './table.css';

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    }
]

const defaultColumns: ColumnDef<Person>[] = [
    {
        accessorKey: 'First Name',
        cell: info => info.getValue(),
        size: 90,
        footer: props => props.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'Last Name',
        cell: info => info.getValue(),
        size: 90,
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'age',
        header: () => 'Age',
        size: 30,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'visits',
        size: 70,
        header: () => <span>Visits</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 50,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 100,
        footer: props => props.column.id,
    },
]

type Props = {

}

const Table: FC<Props> = () => {
    const [data, setData] = React.useState(() => [...defaultData])
    const [columns] = React.useState<typeof defaultColumns>(() => [...defaultColumns,])

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    const ref = useRef<any>();

    useEffect(() => {
        ref.current.recalculate();
    })

    return (
        <div className="w-full form-resizable-table">
            <SimpleBar ref={ref} autoHide={false}>
                <table
                    style={{ width: table.getCenterTotalSize(), }}
                    className="resizable mb-3"
                >
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            width: header.getSize(),
                                        }}
                                        className="group/table-group"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`bg-gray-500 w-1 absolute top-0 right-0 h-full cursor-col-resize opacity-0 group-hover/table-group:opacity-100 resizer ${header.column.getIsResizing() ? 'isResizing !bg-blue-600 opacity-100' : ''}`}
                                        />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        style={{
                                            width: cell.column.getSize()
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </SimpleBar>
        </div>
    );
}

export default Table;