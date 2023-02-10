export function getQueryString(obj) {
  let context = "?";
  let first = true;
  for (const key in obj) {
    if (first) {
      context += `${key}=${obj[key]}`;
      first = false;
    } else {
      context += `&${key}=${obj[key]}`;
    }
  }
  return context;
}
