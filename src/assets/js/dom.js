export function addClass(el, className) {
  console.log("rd: addClass -> el.classList", el.classList)
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
export function removeClass(el, className) {
  el.classList.remove(className)
}
