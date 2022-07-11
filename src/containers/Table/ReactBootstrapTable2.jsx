import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import overlayFactory from "react-bootstrap-table2-overlay";
import { Spinner } from "reactstrap";
// import "./Table.css";

const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];
// const { SearchBar } = Search;

// const NoDataIndication = () => (
//   <div className="spinner">
//     <div className="rect1" />
//     <div className="rect2" />
//     <div className="rect3" />
//     <div className="rect4" />
//     <div className="rect5" />
//   </div>
// );

const ReactBootstrapTable2 = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
  loading,
  propsDefaultSort,
}) => (
  <div>
    {/* {console.log(loading)} */}

    {/* {loading && <div className="text-center"><Spinner color="info" /></div>} */}
    <ToolkitProvider
      bootstrap4
      keyField="id"
      data={data}
      columns={columns}
      wrapperClasses="table-responsive"
      search
    >
      {(props) => (
        <div>
          {/* <div className="float-right">
                            <SearchBar {...props.searchProps} placeholder=" " />
                            {console.log(props)}
                        </div> */}
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory({ page, sizePerPage, totalSize })}
            striped
            hover
            remote={{ search: true, pagination: true, sort: true }}
            onTableChange={onTableChange}
            defaultSorted={!propsDefaultSort ? defaultSorted : propsDefaultSort}
            loading={loading}
            overlay={overlayFactory({
              spinner: true,
              background: "rgba(192,192,192,0.3)",
            })}
            noDataIndication="Data is Empty"
            wrapperClasses="table-responsive"
          />
        </div>
      )}
    </ToolkitProvider>
  </div>
);

export default ReactBootstrapTable2;
