// first we need to create a stage
//var Konva = require('konva');

// creating js tree instances

$(function () {
    // 6 create an instance when the DOM is read
    $('#jstree').jstree();
    // 7 bind to events triggered on the tree
    $('#jstree').on("changed.jstree", function (e, data) {
      console.log(data.selected);
    });
    // 8 interact with the tree - either way is OK
    $('button').on('click', function () {
      $('#jstree').jstree(true).select_node('child_node_1');
      $('#jstree').jstree('select_node', 'child_node_1');
      $.jstree.reference('#jstree').select_node('child_node_1');
    });
});

jsPlumb.ready(function() {
  jsPlumb.draggable("item_left");
  jsPlumb.draggable("item_right");
});

var service;

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "http://127.0.0.1:3000/listServices", false ); // false for synchronous request
xmlHttp.send(null);
var response = JSON.parse(xmlHttp.responseText);
console.log(response);

console.log(response.WebServicesList);

var appendStr = "";
for(var i = 0; i < response.WebServicesList.length; i++)
{
    //for(var key in response.WebServicesList[i]) {
    appendStr += '<li onclick = "flush()">' + response.WebServicesList[i]['Name'] + '<ul>';
    for(var j = 0; j < response.WebServicesList[i]['List'].length; j++)
    {
        //appendStr += "<li class='list-group-item'>" + response.WebServicesList[i][key][j]['Name'] + "</li>";
        console.log(JSON.stringify(response.WebServicesList[i]['List'][j]));
        appendStr += '<li id="' + response.WebServicesList[i]['List'][j]['Id'] + '" onclick = "display(\'' + response.WebServicesList[i]['List'][j]['Description'] + '\',\'' + response.WebServicesList[i]['List'][j]['Id']  + '\')">' + response.WebServicesList[i]['List'][j]['Name'] + '</li>';
        //appendStr += "";
    }
    appendStr += "</ul></li>";
    //}      
}

var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

var times = 0;

function flush()
{
    document.getElementById("add").disabled = true;
    times++;
    if(times == 2) {
        document.getElementById("add").disabled = false;
    }
    times = 0;
}


function display(description, id)
{
    service = id;
    console.log(service);
    document.getElementById("text").innerHTML = "";
    showText("#text", description, 0, 1);
    document.getElementById("add").disabled = false;
    times++;
}

console.log(appendStr);

//document.getElementById("webservices").innerHTML += "" +xmlHttp.responseText;
document.getElementById("list").innerHTML += "" + appendStr;

//}

var width = window.innerWidth / 2;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
var layer = new Konva.Layer();
var rectX = stage.getWidth() / 2;
var rectY = stage.getHeight() / 2;

/*var box = new Konva.Rect({
    x: rectX,
    y: rectY,
    width: 100,
    height: 50,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true,
    id: "B01"
});

// add cursor styling
box.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
    console.log("box id");
});
box.on('mouseout', function() {
    document.body.style.cursor = 'default';
});
box.on('click', function() {
    console.log(box.id());
});
layer.add(box);*/

// Adding connected arrow and circles

/*var circle = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 40,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
});

var circleA = new Konva.Circle({
    x: stage.getWidth() / 5,
    y: stage.getHeight() / 5,
    radius: 30,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
});

var arrow = new Konva.Arrow({
    points: [circle.getX(), circle.getY(), circleA.getX(), circleA.getY()],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 4
});

function adjustPoint(e){
    var p=[circle.getX(), circle.getY(), circleA.getX(), circleA.getY()];
    arrow.setPoints(p);
    layer.draw();
}

circle.on('dragmove', adjustPoint);
circleA.on('dragmove', adjustPoint);

layer.add(circleA);
// add the shape to the layer
layer.add(circle);
layer.add(arrow);

stage.add(layer);*/

var index = 2;
var start = false;
var arrow_x = 0;
var arrow_y = 0;

var object_arr_ids = [];

var box_1_id = "";

var servicesList = [];

function add(){

    console.log(service);

    var serviceObj = null;

    // find the service object
    for(var i = 0; i < response.WebServicesList.length; i++)
    {
        var found = false;
        for(var j = 0; j < response.WebServicesList[i]['List'].length; j++)
        {
            if(response.WebServicesList[i]['List'][j]['Id'] == service)
            {
                serviceObj = response.WebServicesList[i]['List'][j];
                found = true;
                break;
            }
        } 
        if(found)
            break;
    }
    //document.getElementById("panel-container").innerHTML += '<div id="'+ service +'" class="drag-comp draggable"><p>' + service + '</p></div>';

    document.getElementById("panel-container").innerHTML += '<div id="C'+ service +'" class="drag-comp"><p>' + serviceObj['Name'] + '</p></div>';

    servicesList.push(serviceObj);

    console.log(serviceObj)
    console.log(servicesList[servicesList.length-1]);

    jsPlumb.ready(function() {
        jsPlumb.draggable("C"+ service);
        if(servicesList.length > 1)
        {
            jsPlumb.connect({
                source:"C"+servicesList[servicesList.length-1]['Id'],
                target:"C"+servicesList[servicesList.length-2]['Id'],
                endpoint:"Rectangle"
            });
            jsPlumb.draggable("C"+servicesList[servicesList.length-1]['Id']);
            jsPlumb.draggable("C"+servicesList[servicesList.length-2]['Id']);
        }
    });

    var group = new Konva.Group({
        x: 0,
        y: 0,
        rotation: 0,
        id: "G" + service
    });

    var complexText = new Konva.Text({
      x: rectX,
      y: rectY,
      text: service,
      fontSize: 18,
      fontFamily: 'Calibri',
      fill: '#555',
      width: 300,
      padding: 20,
      align: 'left'
    });

    var box = new Konva.Rect({
        x: rectX,
        y: rectY,
        width: 100,
        height: 50,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        id: service
    });
   
    group.add(box);
    group.add(complexText);

    object_arr_ids.push(service);

    index = index + 1;

    group.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
        box.fill('#FF0000');
        if(start == false)
        {
            start = true;
            box_1_id = group.id();
        } else {
            start = false;
            var arrow = new Konva.Arrow({
              points: [arrow_x, arrow_y, (box.x() + (box.width() / 2)), (box.y() + (box.height() / 2))],
              pointerLength: 10,
              pointerWidth: 10,
              fill: 'black',
              stroke: 'black',
              strokeWidth: 4
            });
            layer.add(arrow);

            var box1 = stage.find("#"+box_1_id)[0];

            function adjustPointBox(e){
                var p=[box1.getX(), box1.getY(), box.getX(), box.getY()];
                arrow.setPoints(p);
                layer.draw();
            }

            box1.on('dragmove', adjustPointBox);
            box.on('dragmove', adjustPointBox);

        }
    });
    group.on('mouseout', function() {
        document.body.style.cursor = 'default';
        box.fill('#00D2FF');
        console.log(box.id() + " = [" + box.x() + "," + box.y() + "]");
        if (start == true)
        {
            arrow_x = box.x() + (box.width() / 2);
            arrow_y = box.y() + (box.height() / 2);
        } else {
            arrow_x = 0;
            arrow_y = 0;
        }
    });
    /*box.off('mouseover');
    box.off('mouseout');*/

    //layer.add(group);
    
    //layer.add(box);
    //layer.add(complexText);
    layer.add(group);

    stage.add(layer);
    //document.getElementById("basic").onclick = false;
}

/*function connect(){
    for(var n = 0; n < object_arr_ids.length; n++) {
        console.log(""+object_arr_ids[n]);
        var box = stage.find("#"+object_arr_ids[n])[0];
        console.log(box);
        box.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
            box.fill('#FF0000');
            if(start == false)
            {
                start = true;
            } else {         
                if(arrow_x >= -1 && arrow_y >= -1)
                {
                    var arrow = new Konva.Arrow({
                      points: [arrow_x, arrow_y, (box.x() + (box.width() / 2)), (box.y() + (box.height() / 2))],
                      pointerLength: 10,
                      pointerWidth: 10,
                      fill: 'black',
                      stroke: 'black',
                      strokeWidth: 4
                    });
                    layer.add(arrow);
                    start = false;
                }
            }
        });
        box.on('mouseout', function() {
            document.body.style.cursor = 'default';
            box.fill('#00D2FF');
            console.log(box.id() + " = [" + box.x() + "," + box.y() + "]");
            if (start == true)
            {
                arrow_x = box.x() + (box.width() / 2);
                arrow_y = box.y() + (box.height() / 2);
            } else {
                arrow_x = -1;
                arrow_y = -1;
            }
        });
    }
}*/

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener
    // call this function on every dragend event
    /*onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent = (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px');
    }*/
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;