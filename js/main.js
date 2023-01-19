// кнопки далі і назад
// підпис тексту до кожного слайду
// виведення номера та максимальної кількості (1/3,2/3,/3/3)
// пагінація (при натисканні - перемикається на потрібний слайд)
// Додаткові параметри:

// loop - можливість гортати слайдер по колу (наприклад, коли на 3 слайді натискаємо далі - переходимо на 1). true або false
// navs – Виведення стрілочок або їх відключення. true або false
// pags - виведення пагінації чи відключення. true або false
// auto - слайдер сам перемикається, якщо delay не вказано, раз на 5 сек. А
// stopMouseHover - якщо навести мишкою на слайд, він не перемикається, як тільки мишку прибрали, знову пішло. Працює тільки коли auto дорівнює true. true або false
// delay - час у секундах на показ слайду, якщо auto true

import { slides } from "./data.js";

class Slider {
  constructor(slides, selector, { loop, navs, pags, auto, delay = 5 }) {
    this.slides = slides;
    this.element = document.querySelector(selector);
    this.loop = loop;
    this.navs = navs;
    this.pags = pags;
    this.auto = auto;
    this.delay = delay;
    this.init();
  }
  init() {
    if (this.navs) {
      this.addNavs();
    }
  }
  addNavs() {
    const markup = `<ul class="button-list js-button-list">
    <li class="button-item-prev js-button-item-prev">
      <button class="item-btn js-item-btn">&#60;</button>
    </li>
    <li class="button-item-next js-button-item-next">
      <button class="item-btn js-item-btn">&#62;</button>
    </li>
  </ul>`;
    this.element.insertAdjacentHTML("beforeend", markup);
  }
}

const slider = new Slider(
  slides, // слайды
  ".js-slider", // id для вставки в html
  {
    loop: true,
    navs: true,
    pags: false,
    auto: false,
    delay: 3,
  }
);
