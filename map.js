var mymap;
var attr_osm = 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors';
var attr_overpass = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';
var osm = new L.TileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
      'opacity': 0.7,
      'attribution': [attr_osm, attr_overpass].join(', ')
  }
);
window.addEventListener("DOMContentLoaded",function(){
   mymap = L.map('mapid').setView([48,14], 13);
  navigator.geolocation.getCurrentPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
});
function do_something(latitude,longitude){
  mymap.setView([latitude,longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);
  var marker = L.marker([latitude,longitude]).addTo(mymap);

  var opl = new L.OverPassLayer({

    'query': '(node({{bbox}})[organic];node({{bbox}})[second_hand];);out qt;',
  });
  
  map.addLayer(mymap);

}


