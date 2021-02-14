import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class Products extends Component {
    constructor(props) {
      super(props);
      this.retrieveProducts = this.retrieveProducts.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveProduct = this.setActiveProduct.bind(this);
  
      this.state = {
        products: [],
        currentProduct: null,
        currentIndex: -1,
      };
    }
  
    componentDidMount() {
      this.retrieveProducts();
    }
  
    retrieveProducts() {
        ProductDataService.getAll()
        .then(response => {
          this.setState({
            products: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveProducts();
      this.setState({
        currentProduct: null,
        currentIndex: -1
      });
    }
  
    setActiveProduct(product, index) {
      this.setState({
        currentProduct: product,
        currentIndex: index
      });
    }
  
    render() {
        const {products, currentProduct, currentIndex } = this.state;

        return (
          <div className="list row">
            
            <div className="col-md-6">
              <h4>Product List</h4>
    
              <ul className="list-group">
                {products &&
                  products.map((product, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveProduct(product, index)}
                      key={index}
                    >
                      {product.name}
                    </li>
                  ))}
              </ul>
              <Link
                    to={"/product/add/"}
                    className="badge badge-info"
                  >
                    Add
                  </Link>
              
            </div>
            <div className="col-md-6">
              {currentProduct ? (
                <div>
                  <h4>Product</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentProduct.name}
                  </div>
                  <div>
                    <label>
                      <strong>Category:</strong>
                    </label>{" "}
                    {currentProduct.category.name}
                  </div>
                  <div>
                    <label>
                      <strong>Price (EUR):</strong>
                    </label>{" "}
                    {currentProduct.price}
                  </div>
    
                  <Link
                    to={"/product/edit/" + currentProduct.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Product...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  }