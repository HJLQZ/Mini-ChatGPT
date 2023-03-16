var draggable2 = document.querySelector('.container2');
var isDragging2 = false;
var startx2 = 0;
var starty2 = 0;

function mouseDown2(e) {
    isDragging2 = true;
    startx2 = e.clientX - draggable2.offsetLeft;
    starty2 = e.clientY - draggable2.offsetTop;
}

function mouseMove2(e) {
    if (isDragging2) {
        var newx2 = e.clientX - startx2;
        var newy2 = e.clientY - starty2;
        draggable2.style.left = newx2 + "px";
        draggable2.style.top = newy2 + "px";
    }
}

function mouseUp2(e) {
    isDragging2 = false;
}

draggable2.addEventListener("mousedown", mouseDown2);
draggable2.addEventListener("mousemove", mouseMove2);
draggable2.addEventListener("mouseup", mouseUp2);