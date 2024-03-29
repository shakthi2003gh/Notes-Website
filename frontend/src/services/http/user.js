import { toast } from "react-toastify";
import { request } from "./common";

async function templatePOST(path, payload, cb) {
  return new Promise((resolve, reject) => {
    request
      .post("/user" + path, payload)
      .then(cb(resolve))
      .catch(({ response }) => {
        const { message } = response?.data;

        toast.error(message);
        reject(message);
      });
  });
}

export function login(payload) {
  return templatePOST("/login", payload, (resolve) => ({ data }) => {
    toast.success("Login successfully");
    resolve(data);
  });
}

export function register(payload) {
  return templatePOST("/register", payload, (resolve) => ({ data }) => {
    toast.success(data.message);
    resolve();
  });
}

export function verify(payload) {
  return templatePOST("/verify", payload, (resolve) => ({ data }) => {
    toast.success("Verified successfully");
    resolve(data);
  });
}

export function resend(payload) {
  const path = "/register/resend-otp";

  return templatePOST(path, payload, (resolve) => ({ data }) => {
    toast.success(data.message);
    resolve(data.message);
  });
}
