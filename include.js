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

document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide', {
      direction: 'ttb',
      height: '35rem',
      autoWidth: true,
      wheel: true,
    });
    splide.mount();
  } );

// document.addEventListener( 'DOMContentLoaded', function() {
//   var splide = new Splide( '.splide_image', {
//     direction: 'ttb',
//     height: '50rem',
//     autoWidth: true,
//     wheel: true,
//   });
//   splide.mount();
// } );


document.addEventListener( 'DOMContentLoaded', function () {
  new Splide( '#image-slider', {
    cover : true,
    heightRatio: 1.3,
  } ).mount();
} );