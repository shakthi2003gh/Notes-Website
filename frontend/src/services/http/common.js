import axios from "axios";
import { toast } from "react-toastify";

export default class Request {
  request = axios.create({ baseURL: import.meta.env.VITE_ENDPOINT });
  defaultCB = (resolve) => resolve();

  constructor(basePath) {
    this.basePath = basePath;
  }

  getConfig = () => ({
    headers: { Authorization: localStorage.getItem("Notes-Auth-T") },
  });

  handleCatch(reject) {
    const alert = (message) => {
      toast.error(message);
      reject(message);
    };

    return (res) => {
      const { response, code } = res;
      const { message } = response?.data || {};

      if (code === "ERR_NETWORK") return alert("Network Error");
      if (response.status === 404) return alert("Invalid ENDPOINT");
      if (message) return alert(message);

      reject("somthing went wrong");
    };
  }

  GET(path, cb = this.defaultCB) {
    return new Promise((resolve, reject) => {
      this.request
        .get(this.basePath + path, this.getConfig())
        .then(cb(resolve))
        .catch(this.handleCatch(reject));
    });
  }

  POST(path, payload, cb = this.defaultCB) {
    return new Promise((resolve, reject) => {
      this.request
        .post(this.basePath + path, payload, this.getConfig())
        .then(cb(resolve))
        .catch(this.handleCatch(reject));
    });
  }

  PATCH(path, payload, cb = this.defaultCB) {
    return new Promise((resolve, reject) => {
      this.request
        .patch(this.basePath + path, payload, this.getConfig())
        .then(cb(resolve))
        .catch(this.handleCatch(reject));
    });
  }

  DELETE(path, cb = this.defaultCB) {
    return new Promise((resolve, reject) => {
      this.request
        .delete(this.basePath + path, this.getConfig())
        .then(cb(resolve))
        .catch(this.handleCatch(reject));
    });
  }
}
