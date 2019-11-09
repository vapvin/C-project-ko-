const covers1 = document.querySelector(".covers1");
const covers2 = document.querySelector(".covers2");
const nones = document.querySelector(".none_wrap");
const homeText = document.querySelector(".home_text");
const logo = document.querySelector(".logo");
const nav = document.querySelector(".navigation");

const firstPage = () => {
  covers1.classList.add("cover");
  covers2.classList.add("cover");
  nones.classList.add("block_wrap");
};

const secondsPage = () => {
  homeText.classList.add("animated");
  logo.classList.add("animated");
  nav.classList.add("animated");
};

class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;

    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;

      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;

      this.wordIndex++;

      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", isit);

function isit() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}

// Scroll Effect

const onScroll = event => {
  const sections = document.querySelectorAll(".after_effect");
  const fixNav = document.querySelector(".nav");
  const scrollPos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  for (let i = 0; i < sections.length; i++) {
    const currLink = sections[i];
    const val = currLink.getAttribute("href");
    const refElement = document.querySelector(val);
    const my = document.querySelector(".my");
    const skils = document.querySelector(".skils");
    const items1 = document.querySelector(".left");
    const items2 = document.querySelector(".left2");
    const items3 = document.querySelector(".right");
    const items4 = document.querySelector(".right2");

    if (sections[0].classList.contains("after_block")) {
      logo.innerHTML = "Moon's";
    } else if (sections[1].classList.contains("after_block")) {
      logo.innerHTML = "About";
      my.classList.add("animated");
      skils.classList.add("animated");
    } else {
      logo.innerHTML = "Product";
    }

    if (logo.innerHTML === "Product") {
      items1.classList.add("animated");
      items2.classList.add("animated");
      items3.classList.add("animated");
      items4.classList.add("animated");
    } else {
      items1.classList.remove("animated");
      items2.classList.remove("animated");
      items3.classList.remove("animated");
      items4.classList.remove("animated");
    }

    if (
      refElement.offsetTop <= scrollPos &&
      refElement.offsetTop + refElement.offsetHeight > scrollPos
    ) {
      fixNav.classList.add("fix");
      document.querySelector(".after_effect").classList.remove("after_block");
      currLink.classList.add("after_block");

      if (currLink.classList.contains("fixed")) {
        fixNav.classList.remove("fix");
      }
    } else {
      currLink.classList.remove("after_block");
    }
  }
};

setTimeout(firstPage, 4000);
setTimeout(secondsPage, 4500);

window.addEventListener("load", onScroll);

window.document.addEventListener("scroll", onScroll);
