$(function () {
  $(".typed").typed({
    strings: ["Computer Scientist", "Software Engineer"],
    stringsElement: null,
    typeSpeed: 30,
    startDelay: 1200,
    backSpeed: 20,
    backDelay: 500,
    loop: true,
    loopCount: false,
    showCursor: false,
    cursorChar: "|",
    attr: null,
    contentType: "html",
    callback: function () {},
    preStringTyped: function () {},
    onStringTyped: function () {},
    resetCallback: function () {},
  });
});

const carouselImg = document.querySelectorAll(".carousel-item img");

carouselImg.forEach((img, index) => {
  if (window.innerWidth > 1400) {
    img.style.height = "40rem";
    if (index !== 3 && index !== 4) {
      img.style.width = "30rem !important";
    } else {
      img.style.width = "37.5rem !important";
    }
  } else if (window.innerWidth < 1400) {
    img.style.height = "10rem";
    if (index !== 3 && index !== 4) {
      img.style.width = "5rem !important";
    } else {
      img.style.width = "7.5rem !important";
    }
  }
});
