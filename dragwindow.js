var draggable = document.getElementById('input-field');
//var drag2 = document.getElementById('submit-button');
var isDragging = false;
var startx = 0; 
var starty = 0;
//var sx2 = 0; var sy2 = 0;
function mouseDown(e) {
    isDragging = true;
    startx = e.clientX - draggable.offsetLeft;
    starty = e.clientY - draggable.offsetTop;
    //sx2 = e.clientX - drag2.offsetLeft;sy2 = e.clientY - drag2.offsetTop;
}
function mouseMove(e)
{
    if (isDragging) {
        var newx = e.clientX - startx;
        var newy = e.clientY - starty;
        //var nx2 = e.clientX - sx2;var ny2 = e.clientY - sy2;
        draggable.style.left = newx + "px";
        draggable.style.top = newy + "px";
        //drag2.style.left = nx2 +"px";drag2.style.top = ny2 + "px";
    }
}
function mouseUp(e) {
    isDragging = false;
}
draggable.addEventListener("mousedown", mouseDown);
draggable.addEventListener("mousemove", mouseMove);
draggable.addEventListener("mouseup", mouseUp);
