import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import CategoryDataService from "../services/category.service";
import Select from 'react-select';

export default class AddProduct extends Component {

  constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangePrice = this.onChangePrice.bind(this);
      this.saveProduct = this.saveProduct.bind(this);
      this.newProduct = this.newProduct.bind(this);
      this.getExchangeRate = this.getExchangeRate.bind(this);
      this.state = {
        id: null,
        name: "",
        price: null,
        idc:null, //Category ID
        selectOptions : [], // Category dropdown
        submitted: false,
        
        currency:"USD",
        rate:null,
        result:null
        
      };
    }

    async getOptions(){
      const res = await CategoryDataService.getAll()
      const data = res.data
  
      const options = data.map(d => ({
        "value" : d.id,
        "label" : d.name
      }))
      this.setState({selectOptions: options})
    }

    componentDidMount() {
      this.getOptions()
    }

    handleChange(e){
      this.setState({idc:e.value})
    }
  
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  
    onChangePrice(e) {
      this.setState({
        price: e.target.value
      });

      this.getExchangeRate(this.state.currency);
    }
    
    async getExchangeRate(currency){
      const res = await ProductDataService.rates(currency)
      const data = res.data
      console.log(data);
      this.setState({rate: data.rates.USD,
                      result: this.state.price * this.state.rate})
    }

    saveProduct() {
      var data = {
        name: this.state.name,
        price: this.state.price,
        category:{id:this.state.idc}
      };
  
      ProductDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
            category: response.data.category.id,
  
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    newProduct() {
      this.setState({
        id: null,
        name: "",
        price: null,
        idc: null,

        submitted: false
      });
    }
  
    render() {
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newProduct}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      value={this.state.name}
                      onChange={this.onChangeName}
                      name="name"
                    />
                  </div>

                  

                  <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />

                    </div>
      
                  <div className="form-group">
                    <label htmlFor="price">Price (EUR)</label>
                    <input 
                      type="number"
                      className="form-control"
                      id="price"
                      required
                      value={this.state.price}
                      onChange={this.onChangePrice}
                      name="price"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price (USD)</label>
                    <input 
                      type="number"
                      className="form-control"
                      id="pusd"
                      value={this.state.result}
                      readOnly
                      name="pusd"/>
                  </div>
      
                  <button onClick={this.saveProduct} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          );
    }
  }