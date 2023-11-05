

// The drawGraph function is responsible for visualizing a binary tree using D3.js (a popular JavaScript library for data visualization).    It takes an array of data as input, representing the binary tree structure, and creates a tree diagram based on that data.


function drawGraph(data) {

    var list = [];

    for (var i = 0; i < data.length; i++) {
        var now = data[i];

        var obj = {
            "value": now.value,
            "children": [].concat(now.children),
            "parent": now.parent
        }
        list.push(obj)

    }

    // The code uses a JavaScript trick to get unique values from the data array based on the value property 
    
    //using the [...new Set()] technique. The unique values are stored in the unique array.

    var unique = [...new Set(data.map(x => x.value))]


    // The code sets the dimensions and margins for the SVG graph,.

    var margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    },
        width = (100 * unique.length) - margin.right - margin.left,
        height = (100 * unique.length) - margin.top - margin.bottom;

    var i = 0;


    // Tree Layout and SVG Element:

    // It sets up the D3 tree layout and the SVG container for the tree diagram.

    var tree = d3.layout.tree().size([height, width]);

    var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });
    var svg = d3.select(".graph").append("svg")
        .attr("width", width ).attr("height", height + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// Root Node Selection:

// The root node is selected from the list array, which contains information about all nodes.

    var root = list[0];

    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    nodes.forEach(function (d) {
        d.y = d.depth * 70;

    });

    var gNode = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    var nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        // Node Visualization:

        // Nodes are drawn as circles, and their radius increases with a delay to create a visual effect. The fill color of the circles depends on whether the node has children (light blue if it does, light gray if it doesn't), and nodes with the value "Empty" are hidden.

    var circle = nodeEnter.append("circle")
        .attr("r", 0);

    circle.transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .attr("r", 25)
        .style("fill", function (d, i) {

            return d.children || d._children ? 'lightblue' : 'lightgray'; //#FFE066
        })
        .style("visibility",function(d){
            return d.value == "Empty"? "hidden" : "visible"
        })
        .duration(1000)
        .ease('elastic');

        //Text Labels:

    var charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle")

    charText.transition()
        .delay(function (d, i) {
            return i * 90;
        })
        .text(function (d) {
            return d.value;
        })
        .style("visibility",function(d){
            return d.value == "Empty"? "hidden" : "visible"
        })


    // Paths are drawn to connect parent nodes to their children. Paths are hidden for links connected to nodes with the value "Empty."

    var path = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        })
        .style("visibility",function(d){
            return d.target.value == "Empty"? "hidden" : "visible"
        })
        

    var pathT = path.enter().insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "black")
        .style("visibility",function(d){
            return d.target.value == "Empty"? "hidden" : "visible"
        })

    pathT.transition()
        .delay(function (d, i) {
            return i * 85;
        })
        .attr("d", diagonal);
}
