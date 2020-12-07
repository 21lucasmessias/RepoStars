import axios from 'axios';

const Api = axios.create({
  baseURL:'http://localhost:3333/',
});

export default Api;

//https://api.github.com/search/repositories?q=language:java&sort=stars&page=1