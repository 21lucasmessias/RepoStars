import axios from 'axios';

const Api = axios.create({
  baseURL:'https://api.github.com/search/repositories',
});

export default Api;

//https://api.github.com/search/repositories?q=language:java&sort=stars&page=1