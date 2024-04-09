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
    return ({ response }) => {
      const { message } = response?.data || {};
      if (!message) return reject("somthing went wrong");

      toast.error(message);
      reject(message);
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
