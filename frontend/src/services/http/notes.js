import Request from "./common";

const request = new Request("/notes");

function callBackTemplete(resolve) {
  return ({ data }) => resolve(data);
}

export function getNote(id) {
  return request.GET("/" + id, callBackTemplete);
}

export function sync(id) {
  const path = id ? `/${id}/sync` : "/sync";
  return request.GET(path, callBackTemplete);
}

export function create(payload) {
  return request.POST("/", payload, callBackTemplete);
}

export function update(id, payload) {
  return request.PATCH("/" + id, payload, callBackTemplete);
}

export function Delete(id) {
  return request.DELETE("/" + id, callBackTemplete);
}
