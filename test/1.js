class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    visualize() {
        const treeContainer = document.getElementById('tree');
        treeContainer.innerHTML = ''; // Clear previous visualization
        if (this.root) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            treeContainer.appendChild(svg);

            const svgNS = svg.namespaceURI;

            const treeLayout = this.calculateLayout(this.root, 500, 100);
            this.drawNode(this.root, treeLayout, svg, svgNS);
        }
    }

    calculateLayout(node, x, y) {
        const layout = { x, y, width: 100 };
        if (node.left) {
            const leftLayout = this.calculateLayout(node.left, x, y + 100);
            layout.x = leftLayout.x + leftLayout.width + 50;
            layout.y = y;
        }
        if (node.right) {
            const rightLayout = this.calculateLayout(node.right, x, y + 100);
            layout.width = rightLayout.x - layout.x + rightLayout.width + 50;
        }
        return layout;
    }

    drawNode(node, layout, svg, svgNS) {
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', layout.x + layout.width / 2);
        circle.setAttribute('cy', layout.y);
        circle.setAttribute('r', 30);
        circle.setAttribute('stroke', 'black');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'lightblue');

        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', layout.x + layout.width / 2);
        text.setAttribute('y', layout.y);
        text.setAttribute('dy', '5');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = node.value;

        svg.appendChild(circle);
        svg.appendChild(text);

        if (node.left) {
            const leftLayout = this.calculateLayout(node.left, layout.x, layout.y + 100);
            this.drawLine(layout.x + layout.width / 2, layout.y + 30, leftLayout.x + leftLayout.width / 2, leftLayout.y - 30, svg, svgNS);
            this.drawNode(node.left, leftLayout, svg, svgNS);
        }
        if (node.right) {
            const rightLayout = this.calculateLayout(node.right, layout.x, layout.y + 100);
            this.drawLine(layout.x + layout.width / 2, layout.y + 30, rightLayout.x + rightLayout.width / 2, rightLayout.y - 30, svg, svgNS);
            this.drawNode(node.right, rightLayout, svg, svgNS);
        }
    }

    drawLine(x1, y1, x2, y2, svg, svgNS) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    }
}

let bst = new BST();

function createBST() {
    const input = document.getElementById('input').value;
    const values = input.split(' ').map(Number);
    
    bst = new BST();
    values.forEach(value => bst.insert(value));
    bst.visualize();
}
