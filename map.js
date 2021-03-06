
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
function setViewtostandort()
{
  navigator.geolocation.watchPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
  function do_something(latitude,longitude){
    mymap.setView([latitude,longitude], 15);
  };
};
window.addEventListener("DOMContentLoaded",function(){

  var popupbutton = document.getElementById('popupbutton');
popupbutton.addEventListener("click",function(){
document.getElementById('Popup').style.display="block";
});
var popdown= document.getElementById('backfilter');
popdown.addEventListener("click",function(){
  document.getElementById('Popup').style.display="none";
  });

var popupbuttonroute = document.getElementById('popupbuttonroute');
popupbuttonroute.addEventListener("click",function(){
document.getElementById('popuproute').style.display="block";
});
var popdownroute= document.getElementById('backroute');
popdownroute.addEventListener("click",function(){
  document.getElementById('popuproute').style.display="none";
  });



   mymap = L.map('mapid').setView([48,14], 15);
  navigator.geolocation.getCurrentPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });
});
function do_something(latitude,longitude){
  mymap.setView([latitude,longitude], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> Datenquelle: CC-BY-4.0: <a href="data.linz.gv.at">Stadt Linz - data.linz.gv.at'}).addTo(mymap);
  var stblatt = L.icon({
    iconUrl: 'Pins/greenleavest.png',
    iconSize: [30, 93.3],
});
  var Fahrradgrün = L.icon({
    iconUrl: 'Pins/Fahrradgrün.png',
    iconSize: [30,30],
  });
  var escooterimg = L.icon({
    iconUrl: 'Pins/ElectroscooterblauerPin.png',
    iconSize: [30,30],
  });
  function fahrradmarker(latcords,longcords){
    L.marker([latcords,longcords], {icon: Fahrradgrün}).addTo(mymap);
  };
  
  var marker = L.marker([latitude,longitude],{icon: stblatt}).addTo(mymap);
  var escooter= L.marker([48.3100192,14.2990685],{icon: escooterimg}).addTo(mymap);
  fahrradmarker(48.306973, 14.290217);
  fahrradmarker(48.3121050,14.2994222);
  fahrradmarker(48.306679,14.289829);
  fahrradmarker(48.304744,14.284498);
  fahrradmarker(48.298114,14.299541);
  fahrradmarker(48.309656,14.278211);
  fahrradmarker(48.297160,14.283785);
  fahrradmarker(48.305021,14.290711);


  mymap.addLayer(createoverpasslayer('node["public_transport"="stop_position"]["bus"="yes"]({{bbox}}); node["highway"="bus_stop"]({{bbox}});out body;>;out skel qt;','Pins/BusseroterPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["public_transport"="stop_position"]["tram"="yes"]({{bbox}});out body;>;out skel qt;','Pins/StrassenbahnorangerPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["railway"="halt"]({{bbox}});node["railway"="station"]({{bbox}});out body;>;out skel qt;','Pins/ZugmagentaPin.png',latitude,longitude));
  mymap.addLayer(createoverpasslayer('node["railway"="subway_entrance"]({{bbox}});out body;>;out skel qt;','Pins/Ubahnschwarz.png',longitude,latitude));


}
function createoverpasslayer(query,iconUrl,latitude,longitude){
  return new L.OverPassLayer({
    minZoom: 15,
     endPoint: 'https://lz4.overpass-api.de/api/',
     query: query,
     markerIcon: L.icon({
      iconUrl: iconUrl,
      iconSize: [30,30],
    }),

  });
}


function setonlybus()
{

}