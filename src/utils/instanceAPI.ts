import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN, // Set the base URL for your API
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bear ${"token"}`,
  },
});

export default instance;
