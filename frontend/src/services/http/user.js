import { toast } from "react-toastify";
import Request from "./common";

const request = new Request("/user");

const loginSuccessFully = "Login successfully";
const verifiedSuccessFully = "Verified successfully";

function defaultCallBack(resolve) {
  return ({ data }) => {
    toast.success(data.message);
    resolve();
  };
}

function loginCallBack(message) {
  return (resolve) =>
    ({ data, headers }) => {
      localStorage.setItem("Notes-Auth-T", headers.get("Authorization"));

      toast.success(message);
      resolve(data);
    };
}

export function login(payload) {
  return request.POST("/login", payload, loginCallBack(loginSuccessFully));
}

export function register(payload) {
  return request.POST("/register", payload, defaultCallBack);
}

export function verify(payload) {
  return request.POST("/verify", payload, loginCallBack(verifiedSuccessFully));
}

export function resend(payload) {
  return request.POST("/register/resend-otp", payload, defaultCallBack);
}

export function settingsSync(settings) {
  return request.POST("/settings/sync", settings, (resolve) => ({ data }) => {
    resolve(data);
  });
}

export function checkSettingSync() {
  return request.GET("/settings/sync", (resolve) => ({ data }) => {
    resolve(data);
  });
}
