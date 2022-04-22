export function forbiden(message: string) {
  return { type: "forbiden", message };
}

export function notFound(message: string) {
  return { type: "not_found", message };
}

export function unauthorized(message: string) {
  return { type: "unauthorized", message };
}

export function badRequest(message: string) {
  return { type: "bad_request", message };
}
