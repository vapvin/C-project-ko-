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
    const logo = document.querySelector(".logo");

    if (sections[0].classList.contains("after_block")) {
      logo.innerHTML = "Moon's";
    } else if (sections[1].classList.contains("after_block")) {
      logo.innerHTML = "About";
    } else if (sections[2].classList.contains("after_block")) {
      logo.innerHTML = "Product";
    } else {
      logo.innerHTML = "CONTACT";
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

window.addEventListener("load", onScroll);

window.document.addEventListener("scroll", onScroll);
