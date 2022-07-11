import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListProductContainer from "./containers/Product/ListProductContainer";
import FormProductContainer from "./containers/Product/FormProductContainer";
import ExampleTable from "./containers/Table/ExampleTable";
import ExampleTable1 from "./containers/Table/ExampleTable1";

import TableGridJS from "./containers/Table/TableGridJS";

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


        </Router>
      </Container>
    );
  }
}
