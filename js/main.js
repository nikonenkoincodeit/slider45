import { slides } from "./data.js";
console.log("slides :>> ", slides);

class Slider {
  constructor() {}
}

new Slider(
  slides, // слайды
  "slider", // id для вставки в html
  {
    loop: true,
    navs: true,
    pags: true,
    auto: true,
    delay: 3,
  }
);
