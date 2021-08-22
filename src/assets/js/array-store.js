import storage from "good-storage";
import { FAVORITE_KEY } from "@/assets/js/constant";
export function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) return;
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length >= maxLen) {
    arr.pop();
  }
}
export function remoreFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
export function save(song, key, compare, maxLength) {
  let list = storage.get(key, []);
  insertArray(list, song, compare, maxLength);
  storage.set(key, list);
  return list;
}
export function remove(key, compare) {
  let list = storage.get(key, []);
  remoreFromArray(list, compare);
  storage.set(key, list);
  return list;
}

export function load(key) {
  return storage.get(key, []);
}
