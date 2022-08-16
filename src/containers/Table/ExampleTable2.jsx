import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDataTableComponent from "./ReactDataTableComponent";
import { Button } from "reactstrap";

export default function () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optTable, setOptTable] = useState({
    columns: [
      {
        name: "Name Product",
        selector: (row) => row.name,
        sortable: true,
        sortField: "name",
      },
      {
        name: "Price",
        selector: (row) => row.price,
      },
      {
        name: "Stock",
        selector: (row) => row.stock,
      },
      {
        name: "Action",
        selector: (row) => row.id,
        cell: (row) => (
          <Button onClick={() => handleActionTable(row.id)}>Test</Button>
        ),
      },
    ],
    page: 1,
    totalRows: 0,
    perPage: 5,
    sortColumn: "name",
    sortDirection: "asc",
    vSearch: "",
  });

  const fetchUsers = async ({
    page,
    perPage,
    sortColumn,
    sortDirection,
    vSearch,
  }) => {
    setLoading(true);
    debugger;
    const response = await axios.get(
      `http://localhost:3000/product?q=${vSearch}&_page=${page}&_limit=${perPage}&_sort=${sortColumn}&_order=${sortDirection}`
    );
    setData(response.data);
    setOptTable({ ...optTable, totalRows: response.headers["x-total-count"] });
    setLoading(false);
  };

  const handlePageChange = (page) => {
    debugger;
    fetchUsers({ ...optTable, page: page });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await fetchUsers({ ...optTable, perPage: newPerPage });
    setOptTable({ ...optTable, perPage: newPerPage });
    setLoading(false);
  };

  const handleSort = async (column, sortDirection) => {
    // simulate server sort
    // console.log(column.selector, sortDirection);
    setLoading(true);

    const response = await fetchUsers({
      ...optTable,
      sortDirection: sortDirection,
    });
    const state = await setOptTable({
      ...optTable,
      sortDirection: sortDirection,
    });
    setLoading(false);
  };

  const handleActionTable = (id) => {
    alert(id);
  };

  useEffect(() => {
    fetchUsers({ ...optTable }); // fetch page 1 of users
  }, []);

  return (
    <div>
      <ReactDataTableComponent
        title="List Product"
        columns={optTable.columns}
        data={data}
        progressPending={loading}
        sortServer
        onSort={handleSort}
        pagination
        paginationServer
        paginationPerPage={optTable.perPage}
        paginationTotalRows={optTable.totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
}
