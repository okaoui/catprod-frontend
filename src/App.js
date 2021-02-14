import React, {Component} from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from './components/products';
import EditProduct from './components/edit-product';
import AddProduct from './components/add-product';
import Categories from './components/categories';
import EditCategory from './components/edit-category';
import AddCategory from './components/add-category';


class App extends Component {
  state = {
    products: []
  };

  render () {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/product" className="navbar-brand">
            Shop
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/category"} className="nav-link">
                Categories
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/product"]} component={Products} />
            <Route exact path="/product/add" component={AddProduct} />
            <Route path="/product/edit/:id" component={EditProduct} />

            <Route exact path={["/", "/category"]} component={Categories} />
            <Route exact path="/category/add" component={AddCategory} />
            <Route path="/category/edit/:id" component={EditCategory} />
          </Switch>
        </div>
      </div>

    );
  }
  componentDidMount() {
    fetch('http://localhost:8080/shop/product')
    .then(res => res.json())
    .then((data) => {
      this.setState({ products: data })
    })
    .catch(console.log)
  }
}

export default App;
