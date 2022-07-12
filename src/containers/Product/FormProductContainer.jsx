import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import querystring from "querystring";

class FormProductContainer extends Component {
  state = {
    product: {},
    isUpdate: false,
    errors: {},
  };

  async GetDataById(id) {
    await axios.get(`http://localhost:3000/product/${id}`).then(
      (result) => {
        this.setState({
          product: result.data,
        });
      },
      (err) => {
        alert(err);
      }
    );
  }

  async AddDataToAPI() {
    await axios
      .post(
        `http://localhost:3000/product`,
        querystring.stringify(this.state.product)
      )
      .then(
        (result) => {
          alert("Add Data Success!");
          this.props.history.push("/");
        },
        (err) => {
          alert(err);
        }
      );
  }

  async UpdateDataToAPI() {
    await axios
      .put(
        `http://localhost:3000/product/${this.props.match.params.id}`,
        querystring.stringify(this.state.product)
      )
      .then(
        (result) => {
          alert("Update Success!");
          this.props.history.push("/");
        },
        (err) => {
          alert(err);
        }
      );
  }

  handleFormOnChange = (field, e) => {
    let fields = this.state.product;
    fields[field] = e.target.value;
    this.setState({ fields });
  };

  handleValidation() {
    let fields = this.state.product;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }
    //price
    if (!fields["price"]) {
      formIsValid = false;
      errors["price"] = "Cannot be empty";
    }
    //stock
    if (!fields["stock"]) {
      formIsValid = false;
      errors["stock"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      if (this.state.isUpdate) {
        this.UpdateDataToAPI();
      } else {
        this.AddDataToAPI();
      }
    } else {
      alert("Form has errors.");
    }
  };

  componentDidMount() {
    console.log(this.props);
    let id = this.props.match.params.id;
    // if (this.props.location.state !== undefined) {
    //   let id = this.props.location.state.id;
    // }
    if (id) {
      this.setState({
        isUpdate: true,
      });
      this.GetDataById(id);
      document.getElementById("header-title").innerHTML = "Update Product";
    }
  }
  render() {
    return (
      <Container>
        <h1 id="header-title">Add Product</h1>
        <hr />
        <Row>
          <Col className="col-6">
            <Form>
              <FormGroup>
                <Label for="name_product">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name_product"
                  placeholder="input name"
                  onChange={this.handleFormOnChange.bind(this, "name")}
                  value={this.state.product.name}
                />
                <span className="error">{this.state.errors["name"]}</span>
              </FormGroup>
              <FormGroup>
                <Label for="price_product">Price</Label>
                <Input
                  type="number"
                  min="0"
                  name="price"
                  id="price_product"
                  placeholder="input price"
                  onChange={this.handleFormOnChange.bind(this, "price")}
                  value={this.state.product.price}
                />
                <span className="error">{this.state.errors["price"]}</span>
              </FormGroup>
              <FormGroup>
                <Label for="stock_product">Stock</Label>
                <Input
                  type="number"
                  min="0"
                  name="stock"
                  id="stock_product"
                  placeholder="input stock"
                  onChange={this.handleFormOnChange.bind(this, "stock")}
                  value={this.state.product.stock}
                />
                <span className="error">{this.state.errors["stock"]}</span>
              </FormGroup>
              <Button color="success" onClick={this.handleSubmit.bind(this)}>
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(FormProductContainer);
