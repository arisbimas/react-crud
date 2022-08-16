import React from "react";
import DataTable from "react-data-table-component";
import { FormGroup, Input, Label } from "reactstrap";

//ini dari doc
//import Checkbox from "@material-ui/core/Checkbox";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// const sortIcon = <ArrowDownward />;

//ini dari reactstrap
// const Check = () => {
//   return (
//     <>
//       <Input type="checkbox" />
//     </>
//   );
// };

const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

function ReactDataTableComponent(props) {
  //   console.log(props);

  return (
    <>
      <DataTable
        // selectableRowsComponent={Check}
        selectableRowsComponentProps={selectProps}
        //   sortIcon={sortIcon}
        // dense
        persistTableHead
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
        // paginationPerPage={5}
        {...props}
      />
    </>
  );
}

// export default DataTableBase;
export default ReactDataTableComponent;
