// This constructor function can be used to create node objects for constructing tree structures.


function Node(value, left, right, parent = "", children = []) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;

}



    // This function takes an array arr as input, with the assumption that the first element represents the root of a binary tree, and the subsequent elements are values to construct the tree.

function createTree(arr) {


    // this is the input array taken from user
    for (var i = 1; i < arr.length; i++) {
        nodeDirection(arr[0], arr[i])

        // For each element in arr, it calls the nodeDirection function to establish the correct position (left or right child) for the node in the binary tree.
    }


    createData(arr[0]);

    remove();
    try {
        drawGraph(arr);
    } catch {
        console.log("No Input");
    }
}

// This function is used to remove an SVG graph element from the document. It checks if there is a graph (SVG element) in the document, and if so, it removes it from the parent element.

function remove() {
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph) };

}

// This function is responsible for determining the correct direction (left or right child) to place a node within a binary tree. It takes a root node and a node as arguments.

function nodeDirection(root, node) {
    var a = Number(node.value)
    var b = Number(root.value)
    if (a < b) {
        if (root.left == null) {
            root.left = node;
            node.isLeft = true;
        } else {
            nodeDirection(root.left, node);
        }
    } else if (a > b) {
        if (root.right == null) {
            root.right = node;
            node.isRight = true
        } else {
            nodeDirection(root.right, node);
        }
    }

}


// This function manipulates the binary tree structure to ensure that each node has both a left and a right child.

// If a child is missing, it adds a placeholder node labeled "Empty" to maintain the tree's structure.

function createData(node) {

    // if there is no input then it is said to be null

    if (node == null) { return }

    if (node.left) {
        node.children.push(node.left);
        node.left.parent = node;
        if(!node.right){
            let newNode = new Node("Empty",null,null)
            newNode.isRight = true
            node.children.push(newNode);
            newNode.parent = node            
        }

    }

    if (node.right) {
        node.children.push(node.right);
        node.right.parent = node;
        if(!node.left){
            let newNode = new Node("Empty",null,null)
            newNode.isLeft = true
            node.children.unshift(newNode);
            newNode.parent = node
        }
    }

    createData(node.left);
    createData(node.right);

}


function createNodes(list) {
    new_list = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == "") { continue }
        new_list.push(new Node(list[i], null, null));

    }

    createTree(new_list)

    if (new_list.length != 0) {
        document.querySelector(".btn").disabled = false
    } else {
        document.querySelector(".btn").disabled = true

    }

    return new_list
}