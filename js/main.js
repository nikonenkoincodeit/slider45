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
    this._activeSlide = 0;
    this.init();
  }
  get activeSlide() {
    return this._activeSlide;
  }
  set activeSlide(value) {
    this._activeSlide = this.getActiveSlides(value);
    this.addImg();
    this.addDiscr();
  }
  init() {
    if (this.navs) {
      this.addNavs();
      this.clickArrow();
    }
    if (this.pags) {
      this.addPags();
      this.clickDots();
    }
    this.addImg();
    this.addDiscr();
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

  addPags() {
    const markup = ` <ul class="point-list js-point-list">
         ${this.slides
           .map(
             (
               elem,
               index
             ) => `<li class="point-item js-point-item" data-id="${index}">
          <button class="point-btn js-point-btn ${
            index === this.activeSlide ? "btn-active" : ""
          }"></button>
        </li>`
           )
           .join("")}
      </ul>`;
    this.element.insertAdjacentHTML("beforeend", markup);
  }
  addImg() {
    const imgEl = this.element.querySelector(".js-slider-img");
    imgEl.src = this.slides[this.activeSlide].img;
    imgEl.alt = this.slides[this.activeSlide].text;
  }
  addDiscr() {
    const discrEl = this.element.querySelector(".js-descr");
    discrEl.textContent = this.slides[this.activeSlide].text;
  }
  clickArrow() {
    this.element.addEventListener("click", this.onClickBtn.bind(this));
  }
  clickDots() {
    this.element.addEventListener("click", this.onClickBtnDots.bind(this));
  }
  onClickBtnDots(event) {
    const dotLiEl = event.target.closest(".js-point-item");
    if (!dotLiEl) {
      return;
    }
    const dotId = dotLiEl.dataset.id;
    this.activeSlide = +dotId;
  }
  onClickBtn(event) {
    if (event.target.closest(".button-item-prev")) {
      this.activeSlide -= 1;
    }
    if (event.target.closest(".button-item-next")) {
      this.activeSlide += 1;
    }
  }
  getActiveSlides(value) {
    if (this.loop) {
      if (value < 0) {
        return this.slides.length - 1;
      }
      if (value > this.slides.length - 1) {
        return 0;
      }
      return value;
    }
    // Variant 1
    return Math.max(0, Math.min(value, this.slides.length - 1));

    // Variant 2

    // if (value < 0) {
    //   return 0;
    // }
    // if (value > this.slides.length - 1) {
    //   return this.slides.length - 1;
    // }
    // return value;
  }
}

const slider = new Slider(
  slides, // слайды
  ".js-slider", // id для вставки в html
  {
    loop: false,
    navs: true,
    pags: true,
    auto: false,
    delay: 3,
  }
);
