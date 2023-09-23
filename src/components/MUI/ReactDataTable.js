import React from 'react';
import DataTable from 'react-data-table-component';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };


function ReactDataTable(props) {
    return (
        <DataTable
            pagination
            dense
            selectableRows
            sortIcon={<KeyboardArrowDownIcon />}
            fixedHeader
            {...props}
        />
    );
}

export default ReactDataTable;