import http from "../http-common";

class CategoryDataService {
    getAll() {
      return http.shopHttp.get("/category");
    }
  
    get(id) {
      return http.shopHttp.get(`/category/${id}`);
    }
  
    create(data) {
      return http.shopHttp.post("/category/add", data);
    }
  
    update(id, data) {
      return http.shopHttp.put(`/category/${id}`, data);
    }
  
    delete(id) {
      return http.shopHttp.delete(`/category/${id}`);
    }
  
  }

  export default new CategoryDataService();