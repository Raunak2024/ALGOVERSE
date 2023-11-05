
//This script primarily handles user interactions, such as panning, zooming, and searching for specific nodes within the binary tree, and provides visual feedback by changing the colors of tree nodes.

// DOM Element Selection:

//The output variable selects an HTML element with the ID "tree."

const output = document.getElementById("tree");


// The getInput function is called when user input is provided. 

//It extracts numeric values from the user's input, split by spaces, and stores them in an array named num.

// Non-numeric and newline characters are filtered out.

function getInput() {
    const value = document.getElementById("inp").value;
    var arr = value.split(" ")
    var num = [];

    for (var i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) && arr[i] != "\n") {
            num.push(arr[i])
        }
    }
    return num
}

// The action function is responsible for enabling the zooming functionality for the tree visualization when the user interacts with it.

function action() {
    getRoot()
    const el = document.querySelector('#tree');
    el.onwheel = zoom;

}

// The getRoot function calls getInput to retrieve user input as an array of numeric values. It then calls 

function getRoot() {
    var result = getInput()

    var root = createNodes(result);
    return root
}

var tree = document.getElementById("tree");
var starty, startx, scrleft, scrtop, isdown;



// these all are here event listeners that works on mouse effects

tree.addEventListener('mousedown', e => MouseDown(e));
tree.addEventListener('mouseup', e => mouseUp(e))
tree.addEventListener('mouseleave', e => mouseLeave(e));
tree.addEventListener('mousemove', e => mouseMove(e));



function MouseDown(e) {
    isdown = true;
    startx = e.pageX - tree.offsetLeft;
    starty = e.pageY - tree.offsetTop;
    scrleft = tree.scrollLeft;
    scrtop = tree.scrollTop;
}

function mouseUp(e) {
    isdown = false;
}

function mouseLeave(e) {
    isdown = false;
}

function mouseMove(e) {
    if (isdown) {
        e.preventDefault();

        var y = e.pageY - tree.offsetTop;
        var goY = y - starty;
        tree.scrollTop = scrtop - goY;

        var x = e.pageX - tree.offsetLeft;
        var goX = x - startx;
        tree.scrollLeft = scrleft - goX;
    }
}
// the zoom function is triggered when the user scrolls  to zoom in or out of the tree visualization. It scales the tree diagram accordingly.

let scale = 1;

function zoom(event) {
    const el = document.querySelector('svg');

    event.preventDefault();

    scale += event.deltaY * -0.001;

    // Restrict scale
    scale = Math.min(Math.max(.250, scale), 1);

    // Apply scale transform
    el.style.transform = `scale(${scale})`;
}

function clear(el) {
    var allContainers = document.querySelectorAll(".numContainer")
    var inp = document.getElementById("inp")

    inp.value += ''

    allContainers.forEach(item => {
        if (item != el) {
            item.style.transform = "scale(0.9)"
            item.style.opacity = 0.7
        } else {
            item.style.transform = "scale(1.1)"
            item.style.opacity = 1
        }

    })
}

function toggleLock() {
    var btn = document.querySelector(".btn")
    var inp = document.getElementById("inp")
    var btn_click = document.querySelector(".btn-clear")
    let cont = document.querySelector(".findContainer")


    if (btn.innerHTML == "Lock") {
        btn.innerHTML = "Unlock"
        clearAndCreate()


    } else {
        cont.innerHTML = ''
        inp.style.display = "block"
        btn_click.style.display = "none"
        btn.innerHTML = "Lock"

        var circles = document.querySelectorAll(".node");

        circles.forEach((circle, i) => {
            setTimeout(() => {
                circle.firstChild.classList.remove("green")
                circle.firstChild.classList.remove("gold")
                circle.firstChild.classList.remove("gray")


            }, i * 100)
        })
    }
}

function clearAndCreate() {
    var inp = document.getElementById("inp")
    var btn_click = document.querySelector(".btn-clear")
    let cont = document.querySelector(".findContainer")
    document.querySelector(".findContainer").innerHTML = ''

    var result = getInput()
    result = result.filter(item => item !== '')

    result = [...new Set(result)]

    if (result.length > 0) {
        inp.style.display = "none"
        btn_click.style.display = "block"

    }

    result.forEach((circle) => {
        var root = getRoot()[0]
        let el = document.createElement("button");
        el.classList.add("numContainer");
        el.innerHTML = circle
        el.style.transition = "1s"
        el.onclick = function () {
            clear(el)
            findTheNode(root, el)
        }
        cont.appendChild(el)
    })
}

function findTheNode(root, node) {
    var value = parseFloat(node.innerHTML)

    fillToColor(root.value, root.value == value ? "green" : "gold")

    if (root.value == value) return

    if (root.value > value) {
        findTheNode(root.left, node)
        fillTheCircle(root.right, value)

    } else {
        findTheNode(root.right, node)
        fillTheCircle(root.left, value)

    }
}

function fillTheCircle(root, value) {

    if (root == null || root.value == value) return
    fillToColor(root.value, "gray")

    fillTheCircle(root.left)
    fillTheCircle(root.right)

}

function fillToColor(value, color) {
    var circles = document.querySelectorAll(".node");

    circles.forEach((circle, i) => {
        circle.firstChild.classList.remove("green")
        circle.firstChild.classList.remove("gold")
        circle.firstChild.classList.remove("gray")
        if (circle.lastChild.innerHTML === value) {

            setTimeout(() => {
                circle.firstChild.classList.add(color)
            }, i * 100)

        }
    })
}
