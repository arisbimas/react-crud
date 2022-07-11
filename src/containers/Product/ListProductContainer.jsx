import axios from "axios";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { Button, Spinner } from "reactstrap";
import {
  faInfoCircle,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { SearchBar } = Search;
export default class ListProductContainer extends Component {
  state = {
    data: [],
    isErrorData: false,
    errDataMsg: "",
  };

  async getDataFromAPI() {
    await axios.get(`http://localhost:3000/product`).then(
      (result) => {
        this.setState({
          data: result.data,
        });
      },
      (err) => {
        console.log("error add data", err);
        this.setState({
          isErrorData: true,
          errDataMsg: err,
        });
      }
    );
  }

  async deleteData(id) {
    await axios.delete(`http://localhost:3000/product/${id}`).then(
      (result) => {
        alert(result.data.message);
        this.getDataFromAPI();
      },
      (err) => {
        alert(err);
      }
    );
  }

  handleDelete = (param) => {
    this.deleteData(param);
  };

  componentDidMount() {
    this.getDataFromAPI();
  }

  render() {
    const columns_products = [
      {
        dataField: "id",
        text: "Product ID",
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true,
      },
      {
        dataField: "price",
        text: "Product Price",
      },
      {
        dataField: "link",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={`/form-product/${row.id}`}>
                <Button color="info" className="btn-sm m-1">
                  <FontAwesomeIcon icon={faInfoCircle} /> Update
                </Button>
                {console.log(rowContent)}
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
    ];

    return (
      <div>
        <h1>List Product</h1>
        <Link to="/form-product">
          <Button color="success">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Product
          </Button>
        </Link>

        {this.state.data.length > 0 ? (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={this.state.data}
            columns={columns_products}
            search
          >
            {(props) => (
              <div>
                <div className="float-right">
                  <SearchBar {...props.searchProps} />
                </div>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        ) : (
          <div className="text-center">
            {this.state.isErrorData ? (
              <h5>{this.state.errDataMsg.toString()}</h5>
            ) : (
              <Spinner color="info" />
            )}
          </div>
        )}
      </div>
    );
  }
}
