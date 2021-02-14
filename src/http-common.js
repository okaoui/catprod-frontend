import axios from "axios";

const shopHttp = axios.create({
  baseURL: "https://catprod.herokuapp.com/shop",
  headers: {
    "Content-type": "application/json"
  }
});

const fixerHttp = axios.create({
  baseURL: "http://data.fixer.io/api",
});

const http = {
  shopHttp,
  fixerHttp,
};
export default http;