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
console.log("slides :>> ", slides);

class Slider {
  constructor(slides, selector, { loop, navs, pags, auto, delay = 5 }) {
    this.loop = loop;
    this.navs = navs;
    this.pags = pags;
    this.auto = auto;
    this.delay = delay;
    this._activeIndexSlides = 0;
    this.slides = slides;
    this.selector = document.querySelector(selector);
    this.init();
  }
  init() {
    console.log("start");
    if (this.navs) {
      const markup = this.createNavButton();
      this.addMarkup(markup);
    }

    if (this.pags) {
      const markup = this.createPointButton();
      this.addMarkup(markup);
    }

    const labelMarkup = this.createPositionImg();

    this.addMarkup(labelMarkup);
  }

  get activeIndexSlides() {
    return this._activeIndexSlides;
  }

  set activeIndexSlides(value) {
    this._activeIndexSlides = value;
  }

  addMarkup(markup) {
    this.selector.insertAdjacentHTML("beforeend", markup);
  }

  createPositionImg() {
    return `<div class="numbers js-numbers">
          <span class="first-num js-first-num">${
            this.activeIndexSlides + 1
          }</span>/${this.slides.length}
      </div>`;
  }

  createPointButton() {
    return `<ul class="point-list js-point-list"> 
      ${this.slides
        .map((slid, index) => {
          return `<li class="point-item js-point-item">
              <button class="point-btn js-point-btn  ${
                index === 0 ? "btn-active" : ""
              }" data-index=${index}  ></button>
            </li>`;
        })
        .join("")}
           
        </ul>`;
  }

  createNavButton() {
    return `<ul class="button-list js-button-list">
          <li class="button-item-prev js-button-item-prev">
            <button class="item-btn js-item-btn">&#60;</button>
          </li>
          <li class="button-item-next js-button-item-next">
            <button class="item-btn js-item-btn">&#62;</button>
          </li>
      </ul>`;
  }
}

const slider = new Slider(
  slides, // слайды
  ".js-slider", // id для вставки в html
  {
    loop: true,
    navs: true,
    pags: true,
    auto: true,
    delay: 3,
  }
);
console.log(slider);
