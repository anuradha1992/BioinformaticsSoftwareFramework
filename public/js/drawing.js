// first we need to create a stage
//var Konva = require('konva');

// creating js tree instances

/* Rest of the code */

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

var service;

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "/listServices", false ); // false for synchronous request
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

function showText(target, message, index, interval) {   
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

var index = 2;
var start = false;
var arrow_x = 0;
var arrow_y = 0;

var object_arr_ids = [];

var box_1_id = "";

var servicesList = [];

var modalId = 1;

var DAG;

function createModal (type, name, comp_id)
{
    var strModal = '';
    var strModal = '<div class="modal fade" id="M'+ modalId +'" role="dialog">' +
    '<div class="modal-dialog modal-sm">' +
      '<div class="modal-content">' +
        '<div class="modal-body" style="background-color: #f7f7f9;">';

    if(type == "db")
    {
        strModal += '<div class="form-group">' +
            '<label for="' + name + '">Specify ' + name + ':</label>' +
            '<input type="text" class="form-control" disabled value="./ncbi/test">' +
            '</div>';
    } else if (type == "seq")
    {
        /*strModal += '<form ng-submit="submit()" ng-controller="InputController">' +
            'Specify ' + name + ':' +
            '<input type="text" ng-model="seq" name="text" />' +
            '<input type="submit" id="submit" value="Submit" />' +
            '<pre>list={{seq}}</pre>' +
        '</form>';*/
        strModal += 'sdsadasdas<br><hello-world></hello-world>';

        /*var childScope = scope.$new();
        var x = document.createElement('hello-world');
        var compiled = $compile(x)(childScope);
        parentDiv.appendChild(compiled);*/


    }

    /*strModal += '<div align="right"><button type="button" class="btn" data-dismiss="modal">Cancel</button>&nbsp;' +
          '<button type="button" class="btn" data-dismiss="modal" onclick=saveInput("'+ comp_id +'")>Ok</button></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
    '</div>';*/

    strModal += '</div></div></div></div>';

  modalId++;
  return strModal;

}

function createObj (serviceObj) {
    
}

var comp_id = 1;

var comp_id_list = [];
var component_pool = [];

function add (){

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

    if(serviceObj !== null)
    {
        serviceObj["comp_id"] = "C"+ comp_id + service;
        component_pool.push(serviceObj);
        console.log(serviceObj);
    }

    //document.getElementById("panel-container").innerHTML += '<div id="'+ service +'" class="drag-comp draggable"><p>' + service + '</p></div>'; serviceObj['Name']

    var innerappend = '<div id="C'+ comp_id + service +'" class="drag-comp"><table><tr>';
    comp_id++;

    for(var i=0; i < serviceObj['InputParams'].length; i++)
    {
        var modalHTML = createModal("" + serviceObj['InputParams'][i]['type'], "" + serviceObj['InputParams'][i]['name'], ("C"+ comp_id + service));
        innerappend += '<td style="padding-bottom: 5px"><button class="inner-btn" data-toggle="modal" data-target="#M'+(modalId-1)+'">' + serviceObj['InputParams'][i]['name'] + '</button></td>';
        document.getElementById("modalContainer").innerHTML += modalHTML;
    }

    /*for(var key in serviceObj['InputParams']) {
        innerappend += '<td><button class="inner-btn">' + key + '</button></td>';
    }*/

    innerappend += '</tr><tr><td colspan="3">'+ serviceObj['Name'] +'</td></tr><tr>';

    for(var key in serviceObj['OutputParams']) {
        innerappend += '<td style="padding-top: 5px"><button class="inner-btn">' + key + '</button></td>';
    }

    innerappend += '</tr><table>' + '</div>';

    document.getElementById("panel-container").innerHTML += innerappend;

    servicesList.push(serviceObj);

    console.log(serviceObj)
    console.log(servicesList[servicesList.length-1]);

    jsPlumb.ready(function() {
        /*if(servicesList.length > 1)
        {
            jsPlumb.connect({
                source:"C"+servicesList[servicesList.length-1]['Id'],
                target:"C"+servicesList[servicesList.length-2]['Id'],
                endpoint:"Rectangle"
            });
        }*/
        comp_id_list.push("C"+ (comp_id - 1) + service);
        for(var i = 0; i < comp_id_list.length; i++)
        {
            jsPlumb.draggable(comp_id_list[i]);
        }
    });

}

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

///////////////////////////////////////////////////////////////////////////////////////

var a = $("#a");
var b = $("#b");

//Setting up drop options
var targetDropOptions = {
    activeClass: 'dragActive'
};

//Setting up a Target endPoint
var targetColor = "#316b31";
var targetEndpoint = {
    anchor: "TopCenter", 
    endpoint: ["Dot", { radius: 8}],
    paintStyle: { fillStyle: targetColor},
    isSource: true,
    scope: "green dot",
    connectorStyle: { strokeStyle: targetColor, lineWidth: 8 },
    connector: ["Flowchart"],
    maxConnections: -1,
    isTarget: true,
    dropOptions: targetDropOptions
};

//Setting up a Source endPoint
var sourceColor = "#ff9696";
var sourceEndpoint = {
    anchor: "BottomCenter",
    endpoint: ["Dot", { radius: 8}],
    paintStyle: { fillStyle: sourceColor },
    isSource: true,
    scope: "green dot",
    connectorStyle: { strokeStyle: sourceColor, lineWidth: 8 },
    connector: ["Bezier", { curviness: 63}],
    maxConnections: -1, 
    isTarget: true,
    dropOptions: targetDropOptions
};

jsPlumb.bind("ready", function () {

    //Set up endpoints on the divs
    jsPlumb.addEndpoint($(".window"), targetEndpoint);
    jsPlumb.addEndpoint($(".window"), sourceEndpoint);

    jsPlumb.draggable($(".window"));
});

function AddDiv() {
    var Div = $('<div>', { id: "X12" }, 
                         { class: 'window ui-draggable' })
              .css(
                         { height: '100px', 
                           width: '100px', 
                           border: 'solid 1px' 
                         }
                  ).appendTo('body');
    jsPlumb.addEndpoint($(Div), targetEndpoint);
    jsPlumb.addEndpoint($(Div), sourceEndpoint);
    jsPlumb.draggable($(Div));
    $(Div).addClass('window');
}