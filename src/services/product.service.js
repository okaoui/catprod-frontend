import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.shopHttp.get("/product");
  }

  get(id) {
    return http.shopHttp.get(`/product/${id}`);
  }

  create(data) {
    return http.shopHttp.post("/product/add", data);
  }

  update(id, data) {
    return http.shopHttp.put(`/product/${id}`, data);
  }

  delete(id) {
    return http.shopHttp.delete(`/product/${id}`);
  }

  rates(currency){
    return http.fixerHttp.get(`/latest?access_key=44d46781a2116be5c54b536b7f35b1fd&symbols = ${currency}`)
    
  }

}

export default new ProductDataService();
