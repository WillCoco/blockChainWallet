export function safeParse(json) {
  let data;
  try {
    data = JSON.parse(json);
  } catch (err) {
    console.warn('JSON.parse error: ', json);
  }
  return data;
}

export function safeStringify(data) {
  let json;
  try {
    json = JSON.stringify(data);
  } catch (err) {
    console.warn('JSON.stringify error: ', data);
  }
  return json;
}