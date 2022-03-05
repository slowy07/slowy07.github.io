var i = 0;
var text = "Computer scientist";
function typing() {
    if (i < text.length) {
        document.getElementById("running-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 300);
    }
    
}
typing();
