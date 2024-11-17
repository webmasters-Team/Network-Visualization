// create a network
var container = document.getElementById('network');
var data = getScaleFreeNetwork(50);
var nodeInfoCard = $('.node-info');
var nodeNumber = $("#nodeNumber");

var options = {
  height: '100%',
  width: '100%',
  interaction: {
    tooltipDelay: 100,
    hover: true
  }
};

var network = new vis.Network(container, data, options);

network.on('selectNode', showInfoCard);
network.on('deselectNode', hideInfoCard);

function setNodeInfo(nodeNum) {
  nodeNumber.html(nodeNum);
}

function unsetNodeInfo() {
  nodeNumber.html('');
}

function showInfoCard(params) {
  setNodeInfo(params.nodes[0]);
  
  nodeInfoCard.removeClass('hidden fadeOutDown');
  nodeInfoCard.addClass('fadeInUp');
}

function hideInfoCard() {
  nodeInfoCard.removeClass('hidden fadeInUp');
  nodeInfoCard.addClass('fadeOutDown');
  
  unsetNodeInfo()
}

function getScaleFreeNetwork(nodeCount) {
  var nodes = [];
  var edges = [];
  var connectionCount = [];

  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      title: 'Node ' + i,
      label: String(i),
      font: {
        face: 'Roboto',
        size: 16
      },
      borderWidth: 5,
      color: {
        color: '#FFFFFF',
        background: '#282A36',
        border: 'rgba(255,255,255, .85)'
      }
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    } else if (i > 1) {
      var conn = edges.length * 2;
      var rand = Math.floor(Math.random() * conn);
      var cumul = 0;
      var j = 0;
      while (j < connectionCount.length && cumul < rand) {
        cumul += connectionCount[j];
        j++;
      }
      var from = i;
      var to = j;
      edges.push({
        from: from,
        to: to,
        title: 'Edge ' + i,
        width: 2,
        color: 'rgba(255,255,255, .35)',
        shadow: {
          color: 'rgba(0,0,0, .35)'
        }
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  return {
    nodes: nodes,
    edges: edges
  };
}