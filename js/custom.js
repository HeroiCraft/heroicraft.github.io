// Async HTTP GET Function
var HttpClient = function() { // Thanks http://stackoverflow.com/a/22076667/1709894!
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    }

    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send( null );
  }
}

serverStatus = new HttpClient();
serverStatus.get('https://mcapi.us/server/status?ip=mc.heroicraft.net', function(response){ //TODO mcapi has a 5min cache, look for alternatives?
  var data = JSON.parse(response);
  if (data.online == true){
    var onlinePlayers = data.players.now;
    var playerOrPlayers = (function(){
      if (onlinePlayers == 1){ return 'player'; }
      return 'players';
    })();
    statusText = onlinePlayers + ' ' + playerOrPlayers + ' online';
    document.getElementById("status").innerHTML = statusText;
  }
});

function hoverChanger(element, changeTo) {
  element.innerHTML = changeTo;
};

