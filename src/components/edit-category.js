import React, { Component } from "react";
import CategoryDataService from "../services/category.service";

export default class Category extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this.updateCategory = this.updateCategory.bind(this);
      this.deleteCategory = this.deleteCategory.bind(this);
  
      this.state = {
        currentCategory: {
          id: null,
          name: "",
        },
        message: ""
      };
    }
  
    componentDidMount() {
      this.getCategory(this.props.match.params.id);
    }
  
    onChangeName(e) {
      const name = e.target.value;
  
      this.setState(function(prevState) {
        return {
            currentCategory: {
            ...prevState.currentCategory,
            name: name
          }
        };
      });
    }
  
    
  
    getCategory(id) {
        CategoryDataService.get(id)
        .then(response => {
          this.setState({
            currentCategory: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    updateCategory() {
        CategoryDataService.update(
        this.state.currentCategory.id,
        this.state.currentCategory
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "The category was updated successfully!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    deleteCategory() {    
        CategoryDataService.delete(this.state.currentCategory.id)
        .then(response => {
          console.log(response.data);
          this.props.history.push('/category')
        })
        .catch(e => {
          console.log(e);
          this.setState({
            message: e.message
          });
          
        });
    }
  
    render() {
        const { currentCategory } = this.state;

        return (
          <div>
            {currentCategory ? (
              <div className="edit-form">
                <h4>Category</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={currentCategory.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                </form>
    
                
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteCategory}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateCategory}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Category...</p>
              </div>
            )}
          </div>
        );
    }
  }