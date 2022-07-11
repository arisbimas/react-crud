import { faInfoCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "reactstrap";
import ReactBootstrapTable2 from "./ReactBootstrapTable2";

export default function ExampleTable1() {
  const [data, setData] = useState([]);
  const [optTable, setOptTable] = useState({
    columns: [
      {
        dataField: "name",
        text: "Name Product",
        sort: true,
      },
      {
        dataField: "price",
        text: "Prece",
        sort: true,
      },
      {
        dataField: "stock",
        text: "Stock",
        sort: true,
      },
      {
        dataField: "link",
        text: "Action",
        headerStyle: () => {
          return { width: "20%" };
        },
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={`/form-product/${row.id}`}>
                <Button color="info" className="btn-sm m-1">
                  <FontAwesomeIcon icon={faInfoCircle} /> Update
                </Button>
              </Link>
              <Button
                color="danger"
                className="btn-sm m-1"
                onClick={() => this.handleDelete(row.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </Button>
            </div>
          );
        },
      },
    ],
    page: 1,
    sizePerPage: 10,
    totalSize: 6, //harusnya didapat dari api, karna api yang kita pakai sekarang tidak ada maka akan saya hardcode.
    loadingTable: false,
    search: "",
  });

  const ListProduct = async (
    page,
    size,
    sortColumn = "price",
    order = "asc",
    search = ""
  ) => {
    try {
      if (sortColumn === null) {
        sortColumn = "id";
      }
      setOptTable({ ...optTable, loadingTable: true });
      let url = await axios.get(
        `http://localhost:3000/product?q=${search}&_page=${page}&_limit=${size}&_sort=${sortColumn}&_order=${order}`
      );
      const res = url.data;
      setData(res);
      setOptTable({ ...optTable, page, loadingTable: false });
    } catch (error) {
      alert("Error Network!");
      setOptTable({ ...optTable, loadingTable: false });
    }
  };

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    const currentIndex = page;
    setTimeout(() => {
      ListProduct(currentIndex, sizePerPage, sortField, sortOrder);
      setOptTable({ ...optTable, sizePerPage, page });
    }, 2000);
    setOptTable({ ...optTable, loadingTable: true });
  };

  const handleSearch = () => {
    ListProduct(
      1,
      optTable.sizePerPage,
      optTable.sortField,
      optTable.sortOrder,
      optTable.search
    );
  };

  useEffect(() => {
    ListProduct(optTable.page, optTable.sizePerPage);
  }, []);

  return (
    <>
      <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
        <Input
          value={optTable.search}
          onChange={(e) => setOptTable({ ...optTable, search: e.target.value })}
          placeholder="Search..."
        />
        <Button primary onClick={handleSearch}>
          Search
        </Button>
      </div>
      <ReactBootstrapTable2
        data={data}
        columns={optTable.columns}
        page={optTable.page}
        sizePerPage={optTable.sizePerPage}
        totalSize={optTable.totalSize}
        onTableChange={handleTableChange}
        loading={optTable.loadingTable}
      />
    </>
  );
}
