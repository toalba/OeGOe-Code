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
  var stblatt = L.icon({
    iconUrl: 'Pins/greenleavest.png',
    iconSize: [30, 93.3],
});
  var Fahrradgrün = L.icon({
    iconUrl: 'Pins/Fahrradgrün.png',
    iconSize: [30,30],
  });
  function fahrradmarker(latcords,longcords){
    L.marker([latcords,longcords], {icon: Fahrradgrün}).addTo(mymap);
  };
  
  var marker = L.marker([latitude,longitude],{icon: stblatt}).addTo(mymap);
  fahrradmarker(48.306973, 14.290217);
  fahrradmarker(48.3121050,14.2994222);
  fahrradmarker(48.306679,14.289829);
  fahrradmarker(48.304744,14.284498);
  fahrradmarker(48.298114,14.299541);
  fahrradmarker(48.309656,14.278211);
  fahrradmarker(48.297160,14.283785);
  fahrradmarker(48.305021,14.290711);


  mymap.addLayer(createoverpasslayer('node["public_transport"="stop_position"]["bus"="yes"]({{bbox}});out body;>;out skel qt;','Pins/BusseroterPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["public_transport"="stop_position"]["tram"="yes"]({{bbox}});out body;>;out skel qt;','Pins/StrassenbahnorangerPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["railway"="station"]({{bbox}});out body;>;out skel qt;','Pins/ZugmagentaPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["railway"="subway_entrance"]({{bbox}});out body;>;out skel qt;','Pins/Ubahn.png',longitude,latitude));
}
function createoverpasslayer(query,iconUrl,latitude,longitude){
  return new L.OverPassLayer({
    minZoom: 13,
     endPoint: 'https://lz4.overpass-api.de/api/',
     query: query,
     markerIcon: L.icon({
      iconUrl: iconUrl,
      iconSize: [30,30],
    }),

  });
}