//side navigation header
const sidenav = document.querySelectorAll('.sidenav');
M.Sidenav.init(sidenav)

const parallax = document.querySelectorAll('.parallax');
M.Parallax.init(parallax)

const parallax_second = document.querySelectorAll('.parallax-container-second');
M.Parallax.init(parallax_second)

//ease

window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.fade-in');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}