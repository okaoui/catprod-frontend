import React, { Component } from "react";
import CategoryDataService from "../services/category.service";
import { Link } from "react-router-dom";

export default class Categories extends Component {
    constructor(props) {
      super(props);
      this.retrieveCategories = this.retrieveCategories.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveCategory = this.setActiveCategory.bind(this);
  
      this.state = {
        categories: [],
        currentCategory: null,
        currentIndex: -1,
      };
    }
  
    componentDidMount() {
      this.retrieveCategories();
    }
  
    retrieveCategories() {
        CategoryDataService.getAll()
        .then(response => {
          this.setState({
            categories: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveCategories();
      this.setState({
        currentCategory: null,
        currentIndex: -1
      });
    }
  
    setActiveCategory(category, index) {
      this.setState({
        currentCategory: category,
        currentIndex: index
      });
    }
  
    render() {
        const {categories, currentCategory, currentIndex } = this.state;

        return (
          <div className="list row">
            
            <div className="col-md-6">
              <h4>Category List</h4>
    
              <ul className="list-group">
                {categories &&
                  categories.map((category, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveCategory(category, index)}
                      key={index}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
              <Link
                    to={"/category/add/"}
                    className="badge badge-info"
                  >
                    Add
                  </Link>
              
            </div>
            <div className="col-md-6">
              {currentCategory ? (
                <div>
                  <h4>Category</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentCategory.name}
                  </div>
                  
                  
                  <Link
                    to={"/category/edit/" + currentCategory.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Category...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  }