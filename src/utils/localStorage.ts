/**
 * Read the data saved at 'key' in the browser's local[persistent] storage
 * @param key key to get the data storaged
 * @returns string
 */
function getData(key: string) {
  let res = localStorage.getItem(key);
  return res;
  // return "";
}

/**
 * Write the 'value' data in the browser's local[persistent] storage
 * @param key
 * @param value
 */
function setData(key: string, value: string) {
  localStorage.setItem(key, value);
}

export { getData, setData };
