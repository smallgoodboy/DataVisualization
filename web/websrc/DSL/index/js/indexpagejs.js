/**
 * Created by long on 2014/6/3.
 */
function showNodeInfo(d){

    var ss="<table  class=\"table table-striped\">"
        +"<caption><h2>Node</h2></caption> "
        +"<tbody>"
        +"<tr>"
        +"<td>"+"Name"+"</td>"
        +"<td>"+d.name+"</td>"
        +"</tr>"
        +"<tr>"
        +"<td>"+"IP"+"</td>"
        +"<td>"+d.ip+"</td>"
        +"</tr>"
        +"</tbody>"
        +"</table>"
    document.getElementById("informationshow").innerHTML=ss;
}

function showEdgeInfo(d){
    var ss="<table  class=\"table table-striped\">"
        +"<caption><h2>Edge</h2></caption> "
        +"<tbody>"
    /*+"<tr>"
     +"<td>"+"value"+"</td>"
     +"<td>"+d.value+"</td>"
     +"</tr>"
     +"<tr>"
     +"<td>"+"source.name"+"</td>"
     +"<td>"+d.source.name+"</td>"
     +"</tr>"
     +"<tr>"
     +"<td>"+"target.name"+"</td>"
     +"<td>"+d.target.name+"</td>"
     +"</tr>"*/

    for(var p in d){
        ss += "<tr><td>"+p+"</td><td>"+d[p]+"</td></tr>";
    }
    ss += "</tbody></table>";
    document.getElementById("informationshow").innerHTML=ss;
}

function addD3(labelname, jsonpath, width, height){

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(60)
        .size([width, height])

    var svg = d3.select(labelname).append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.behavior.zoom().scaleExtent([0.5, 8]).on("zoom", zoom))
        .on("mousedown.zoom",null)
        .append("g");

    function zoom() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    d3.json(jsonpath, function(error, graph) {
        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        var json = graph;

        var linkedByIndex = {};
        json.links.forEach(function(d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        }

        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return d.value;/*return Math.sqrt(d.value);*/ })
            .on("click", function(d) {
                var selectededge = d;
                svg.selectAll(".node").style("fill", function(d) {
                    if(selectededge.target.name==d.name||selectededge.source.name==d.name){
                        return "grey"}
                    return color(d.group); });
                svg.selectAll(".link").style("stroke", function(d) { return "grey"; });
                //d3.select(this).classed("selected", true);
                d3.select(this).style("stroke", "black");

                showEdgeInfo(d)});

        var selcetdNodes = {};
        var selcetdNodeCount = 0;
        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function(d) { return color(d.group); })
            .call(force.drag)
            .on("click", function(d) {
                // Find previously selected, unselect
                //d3.select(".selected").classed("selected", false);
                // Select current item
                var selectednode = d;
                var e = d3.event;
                if(e.ctrlKey){
                    if(selcetdNodes[selectednode.index]===1){
                        selcetdNodes[selectednode.index]=0;
                        selcetdNodeCount = selcetdNodeCount-1;

                        svg.selectAll(".node").style("fill", function(d) {
                            if(selcetdNodes[d.index]){
                                return "black";
                            }
                            return color(d.group); });
                    }else{
                        selcetdNodes[selectednode.index]=1;
                        selcetdNodeCount = selcetdNodeCount+1;
                        svg.selectAll(".node").style("fill", function(d) {
                            if(selcetdNodes[d.index]){
                                return "black";
                            }
                            return color(d.group); });
                    }
                }else{
                    selcetdNodes = {};
                    selcetdNodes[selectednode.index]=1;
                    selcetdNodeCount =1;

                    svg.selectAll(".node").style("fill", function(d) {
                        if(isConnected(d, selectednode)){
                            return "grey";
                        }
                        return color(d.group); });
                    svg.selectAll(".link").style("stroke", function(d) { if(d.target.name==selectednode.name||d.source.name==selectednode.name){
                        //d3.select(d.target).style("fill", "black"); //.classed("selected", true);;
                        //d.source.classed("selected", true);;
                        return "black";}
                    else{return "grey";} });
                    d3.select(this).style("fill", "black");
                }
                //d3.select(this).classed("selected", true);

                //console.log(selectednode.x);
                showNodeInfo(d)});

        svg.on("mousedown", function(d) {
            console.log("haha");
        }).on("dbclick",function(d) {
            alert("kekek");
        });

        node.append("title")
            .text(function(d) { return d.name; });

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    });
}

function addTheD3Map(labelname, jsonpath){
    var width = 800,
        height = 610;
    width = window.screen.width*0.72;
    addD3(labelname, jsonpath, width, height);

}

var map;
var layergroup;
function addOsmMap(divID){
    map = L.map(divID).setView([30.67, 104.06], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    // add a marker in the given location, attach some popup content to it and open the popup
    //!deletable!!deletable!
    var marker_1 = L.marker([30.67, 104.06])//.addTo(map)
        .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
        .openPopup();

    marker_1.addEventListener("click", function(){marker_1.openPopup()}, false);


    //add a line   !deletable!
    var line = L.polyline([[30.67, 104.06],[30, 116]]);//.addTo(map)
    //.bindPopup('Im a cute line.')
    //.openPopup();

    //add a circle   !deletable!
    var circle = L.circle([30, 116], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    })//.addTo(map);

    layergroup = L.layerGroup([marker_1, line, circle])
        .addTo(map);
    //map.removeLayer(layergroup);
}