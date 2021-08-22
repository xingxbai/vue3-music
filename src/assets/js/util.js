export function shuffle(source) {
  const arr = source.slice();
  console.log(111111, arr);
  for (let i = 0; i < arr.length; i++) {
    const j = random(i);
    console.log(111111, i, j);
    swap(arr, i, j);
  }
  return arr;
}

export function random(max) {
  return Math.floor(Math.random() * (max + 1));
}
export function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
