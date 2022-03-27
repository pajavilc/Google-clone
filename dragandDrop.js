var drag_id = -1;
var boxesArr = [0, 0]
var boxes;

function onloadHandler() {
    var i = 0;
    window.boxes = document.querySelectorAll('#blocks .block');
    for (var box of window.boxes) {
        //alert((Math.ceil(i / 3) % 2 === 1 ? i : (i + 2 - (i - 1) % 3)))
        var id = i;
        window.boxesArr[id] = box;

        box.className += ` -${id}- `
        box.addEventListener('dragstart', dragStart);
        box.addEventListener('dragend', dragEnd);
        box.addEventListener('dragover', dragOver);

        box.addEventListener('dragenter', dragEnter);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', dragDrop);
        i++;
    }
}



function dragStart() {
    window.drag_id = parseInt(this.className.split('-')[1]);
    this.className += ' hide';
}

function dragEnd() {
}

function dragOver(ev) {
    var par = document.getElementById('blocks');
    var id = parseInt(this.className.split('-')[1]);
    if (id === window.drag_id) {
        return
    }
    if (id > window.drag_id) {
        moveElement(par, window.drag_id, id + 1);
        window.boxesArr[window.drag_id].className = `block -${id}- hide`;
        var Tbox = window.boxesArr[window.drag_id];
        for (let i = window.drag_id + 1; i <= id; i++) {
            window.boxesArr[i].className = `block -${(i - 1)}-`;
            window.boxesArr[i - 1] = window.boxesArr[i];
        }
        window.boxesArr[id] = Tbox;
    }
    else {
        moveElement(par, window.drag_id, id);
        window.boxesArr[window.drag_id].className = `block -${id}-  hide`;
        var Tbox = window.boxesArr[window.drag_id];
        for (let i = window.drag_id - 1; i >= id; i--) {
            window.boxesArr[i].className = `block -${(i + 1)}-`;
            window.boxesArr[i + 1] = window.boxesArr[i];
        }
        window.boxesArr[id] = Tbox;
    }
    window.drag_id = id;

    ev.preventDefault();
}
function moveElement(par, pastpos, nextpos) {
    var before = par.children[pastpos];
    var next = par.children[nextpos];
    par.insertBefore(before, next);
}
function dragEnter(ev) {
    ev.preventDefault();

}

function dragLeave(ev) {
    ev.preventDefault();
}

function dragDrop(ev) {
    ev.preventDefault();
}