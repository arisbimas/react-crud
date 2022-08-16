import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListProductContainer from "./containers/Product/ListProductContainer";
import FormProductContainer from "./containers/Product/FormProductContainer";
import ExampleTable from "./containers/Table/ExampleTable";
import ExampleTable1 from "./containers/Table/ExampleTable1";

import TableGridJS from "./containers/Table/TableGridJS";
import ReactDataTableComponent from "./containers/Table/ReactDataTableComponent";
import ExampleTable2 from "./containers/Table/ExampleTable2";
import Memo from "./containers/Hooks/Memo";
import Example3 from "./containers/Table/Example3";

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Route path="/" exact>
            <ListProductContainer />
          </Route>
          <Route path="/form-product" exact>
            <FormProductContainer />
          </Route>
          <Route path="/form-product/:id" exact>
            <FormProductContainer />
          </Route>
          {/* <Route path={"/grid"} component={TableGridJS} /> */}
          <Route path={"/ex"} component={ExampleTable} />
          <Route path={"/ex1"} component={ExampleTable1} />
          <Route path={"/ex2"} component={ExampleTable2} />
          <Route path={"/ex3"} component={Example3} />
          <Route path={"/memo"} component={Memo} />
        </Router>
      </Container>
    );
  }
}
