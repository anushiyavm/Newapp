// src/components/MovieTable.js
import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const MovieTable = ({ movies }) => {
    const columns = React.useMemo(
        () => [
            { Header: 'Title', accessor: 'title' },
            { Header: 'Release Date', accessor: 'releaseDate' },
            { Header: 'Rating', accessor: 'rating' },
        ],
        []
    );

    // Set up table instance with pagination
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize },
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        setPageSize,
        pageCount
    } = useTable(
        {
            columns,
            data: movies,
            initialState: { pageIndex: 0, pageSize: 5 }, // set initial page size and index
        },
        usePagination
    );

    return (
        <TableContainer component={Paper}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map(row => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {/* Pagination Controls */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(event, newPage) => {
                    nextPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                    setPageSize(Number(event.target.value));
                }}
            />
        </TableContainer>
    );
};

export default MovieTable;
