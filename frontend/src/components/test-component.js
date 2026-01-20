import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
    PagingState,
    CustomPaging,
    FilteringState,
    IntegratedFiltering,
    RowDetailState,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    PagingPanel,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import {CircularProgress} from "@mui/material";

const URL = 'http://127.0.0.1:8000/api/company/logs/';

const RowDetail = ({ row }) => (
    <div>
        Description:
        {' '}
        {row.description}
    </div>
);

export default function TestComponent() {
    const [columns] = useState([
        { name: 'username', title: 'Worker' },
        { name: 'title', title: 'Task' },
        { name: 'type', title: 'Log type' },
        { name: 'localized_datetime', title: 'Datetime' },
    ]);
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState();
    const [pageSizes] = useState([5, 10, 15, 20, 1000]);

    const getQueryString = () => (
        `${URL}?page_size=${pageSize}&page=${currentPage+1}`
    );
    const userToken = localStorage.getItem('access_token')
    const loadData = () => {
        const queryString = getQueryString();
        if (queryString !== lastQuery && !loading) {
            setLoading(true);
            fetch(queryString, {headers: {Authorization: "Bearer " + userToken}})
                .then(response => response.json())
                .then(({ results, count: newTotalCount }) => {
                    setRows(results);
                    setTotalCount(newTotalCount);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
            setLastQuery(queryString);
        }
    };

    useEffect(() => loadData());

    return (
        <Paper style={{ position: 'relative' }}>
            <Grid
                rows={rows}
                columns={columns}
            >
                <SortingState
                    defaultSorting={[{ columnName: 'localized_datetime', direction: 'asc' }]}
                />
                <IntegratedSorting />
                <RowDetailState
                    defaultExpandedRowIds={[]}
                />
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                    pageSize={pageSize}
                    pageSizes={pageSizes}
                />
                <CustomPaging
                    totalCount={totalCount}
                />
                <Table />
                <TableHeaderRow showSortingControls/>
                <TableRowDetail
                    contentComponent={RowDetail}
                />
                <PagingPanel
                    pageSizes={pageSizes}
                />
                <TableFilterRow />
            </Grid>
            {loading && <CircularProgress />}
        </Paper>
    );
};